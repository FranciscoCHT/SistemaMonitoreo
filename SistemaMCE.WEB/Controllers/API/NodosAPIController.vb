Imports System.Net
Imports System.Web.Http
Imports SistemaMCE.DATA.Model

Namespace Controllers.API
    <RoutePrefix("api/nodos")>
    Public Class NodosAPIController
        Inherits ApiController

        <HttpGet>
        <Route("{user}", Name:="GetNodosByUser")>
        Public Function GetNodosByUser(user As String) As IHttpActionResult

            Dim db As New MCEContext
            Try
                Dim listNodos As List(Of Nodo) = Nothing
                Dim usuarioAdmin As Usuario = db.Usuarios.Where(Function(u) u.User = user).SingleOrDefault()
                If usuarioAdmin.EsAdmin = True Then
                    listNodos = db.Nodos.ToList()
                Else
                    listNodos = db.Nodos.Where(Function(n) n.Usuario.User = user).ToList()
                End If

                If listNodos Is Nothing OrElse listNodos.Count = 0 Then Return Me.Ok(New List(Of Models.NodoDTO))
                Dim listNodoDto As New List(Of Models.NodoDTO)

                For Each nodo As Nodo In listNodos
                    listNodoDto.Add(New Models.NodoDTO With {.ID = nodo.ID,
                                                                .Nombre = nodo.Nombre,
                                                                .Tipo = nodo.Tipo,
                                                                .TipoStr = nodo.Tipo.ToString,
                                                                .Estado = nodo.Estado,
                                                                .Voltaje = nodo.Voltaje,
                                                                .Sector = New Models.SectorDTO With {.ID = nodo.Sector.ID,
                                                                                                    .Nombre = nodo.Sector.Nombre},
                                                                .Usuario = New Models.UsuarioDTO With {.ID = nodo.Usuario.ID, 'No creo que esto sea necesario, al ser el mismo usuario en cada iteracion.
                                                                                                        .Nombre = nodo.Usuario.Nombre,
                                                                                                        .Apellido = nodo.Usuario.Apellido,
                                                                                                        .EsAdmin = nodo.Usuario.EsAdmin,
                                                                                                        .User = nodo.Usuario.User,
                                                                                                        .Pass = nodo.Usuario.Pass}
                                    })
                Next
                Return Me.Ok(listNodoDto)

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="PostNodos")>
        Public Function PostNodos(<FromBody> model As Models.NodoDTO) As IHttpActionResult

            If model Is Nothing Then Return Me.Content(HttpStatusCode.BadRequest, "Error al obtener información.")

            Dim db As New MCEContext
            Try
                If model.ID <> 0 Then
                    Dim nodoExist As Nodo = db.Nodos.Where(Function(n) n.ID = model.ID).SingleOrDefault()
                    With nodoExist
                        .Nombre = model.Nombre
                        .Tipo = model.Tipo
                        .Estado = model.Estado
                        .Voltaje = model.Voltaje
                        .Sector = db.Sectores.Where(Function(s) s.ID = model.SectorID).SingleOrDefault()
                        .Usuario = db.Usuarios.Where(Function(u) u.ID = model.UsuarioID).SingleOrDefault()
                    End With
                    db.SaveChanges()
                    model.Sector = New Models.SectorDTO With {.ID = nodoExist.Sector.ID, .Nombre = nodoExist.Sector.Nombre}
                    model.Usuario = New Models.UsuarioDTO With {.ID = nodoExist.Usuario.ID, .Nombre = nodoExist.Sector.Nombre, .Apellido = nodoExist.Usuario.Apellido, .EsAdmin = nodoExist.Usuario.EsAdmin, .User = nodoExist.Usuario.User, .Pass = nodoExist.Usuario.Pass}
                    Return Me.Ok(model)
                End If

                If db.Nodos.Where(Function(n) n.Nombre = model.Nombre).Any Then
                    Return Me.Content(HttpStatusCode.BadRequest, "Este nodo ya existe.")
                End If

                Dim nodo As New Nodo With {.Nombre = model.Nombre,
                                                .Tipo = model.Tipo,
                                                .Estado = model.Estado,
                                                .Voltaje = model.Voltaje,
                                                .Sector = db.Sectores.Where(Function(s) s.ID = model.SectorID).SingleOrDefault(),
                                                .Usuario = db.Usuarios.Where(Function(u) u.ID = model.UsuarioID).SingleOrDefault()
                }
                db.Nodos.Add(nodo)
                db.SaveChanges()
                model.ID = nodo.ID
                model.Sector = New Models.SectorDTO With {.ID = nodo.Sector.ID, .Nombre = nodo.Sector.Nombre}
                model.Usuario = New Models.UsuarioDTO With {.ID = nodo.Usuario.ID, .Nombre = nodo.Sector.Nombre, .Apellido = nodo.Usuario.Apellido, .EsAdmin = nodo.Usuario.EsAdmin, .User = nodo.Usuario.User, .Pass = nodo.Usuario.Pass}
                Return Me.Ok(model)

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try

        End Function

        <HttpDelete>
        <Route("{id}", Name:="DeleteNodo")>
        Public Function DeleteNodo(id As Integer) As IHttpActionResult

            If id = 0 Then
                Return Me.Content(HttpStatusCode.NotFound, "No se puede eliminar el nodo debido a posibles dependencias asociadas.")
            End If

            Dim db As New MCEContext
            Try
                Dim nodo As Nodo = db.Nodos.Where(Function(n) n.ID = id).SingleOrDefault

                If db.Lecturas.Where(Function(l) l.Nodo.ID = nodo.ID).Any() Then
                    Return Me.Content(HttpStatusCode.BadRequest, String.Format("El nodo {0} no puede eliminarse debido a que tiene lecturas asociadas.", nodo.Nombre))
                End If

                db.Nodos.Remove(nodo)
                db.SaveChanges()
                Return Me.Content(HttpStatusCode.OK, String.Format("El nodo {0} fue eliminado.", nodo.Nombre))

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try

        End Function

        <Route("tipos", Name:="getTipos")>
        <HttpGet>
        Public Function GetTipos() As IHttpActionResult
            Dim tipoNodo As New List(Of Models.TipoDTO)

            tipoNodo = (From v As Integer In TryCast(System.Enum.GetValues(GetType(Tipo)), Integer()) Select New Models.TipoDTO With {.Clave = v, .Nombre = System.Enum.GetName(GetType(Tipo), v)}).ToList()

            Return Me.Ok(New With {.tipoNodo = tipoNodo})
        End Function

    End Class
End Namespace