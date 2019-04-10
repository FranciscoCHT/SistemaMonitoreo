Imports System.Net
Imports System.Web.Http
Imports SistemaMCE.DATA.Model

Namespace Controllers.API
    <RoutePrefix("api/usuarios")>
    Public Class UsuariosAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetUsuarios")>
        Public Function GetUsuarios() As IHttpActionResult

            Dim db As New MCEContext
            Try
                Dim listUsuarios As List(Of Usuario) = db.Usuarios.ToList()
                If listUsuarios Is Nothing OrElse listUsuarios.Count = 0 Then Return Me.Ok(New List(Of Models.UsuarioDTO))
                Dim listUsuarioDto As New List(Of Models.UsuarioDTO)

                For Each usuario As Usuario In listUsuarios
                    listUsuarioDto.Add(New Models.UsuarioDTO With {.ID = usuario.ID,
                                                                .Nombre = usuario.Nombre,
                                                                .Apellido = usuario.Apellido,
                                                                .User = usuario.User,
                                                                .Pass = usuario.Pass,
                                                                .EsAdmin = usuario.EsAdmin})
                Next
                Return Me.Ok(listUsuarioDto)

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="PostUsuarios")>
        Public Function PostUsuarios(<FromBody> model As Models.UsuarioDTO) As IHttpActionResult

            If model Is Nothing Then Return Me.Content(HttpStatusCode.BadRequest, "Error al obtener información.")

            Dim db As New MCEContext
            Try
                If model.ID <> 0 Then
                    Dim userExist As Usuario = db.Usuarios.Where(Function(t) t.ID = model.ID).SingleOrDefault()
                    With userExist
                        .Nombre = model.Nombre
                        .Apellido = model.Apellido
                        .User = model.User
                        .Pass = model.Pass
                        .EsAdmin = model.EsAdmin
                    End With
                    db.SaveChanges()
                    Return Me.Ok(model)
                End If

                If db.Usuarios.Where(Function(t) t.User = model.User).Any Then
                    Return Me.Content(HttpStatusCode.BadRequest, "Este usuario ya existe.")
                End If

                Dim usuario As New Usuario With {.Nombre = model.Nombre,
                                                .Apellido = model.Apellido,
                                                .User = model.User,
                                                .Pass = model.Pass,
                                                .EsAdmin = model.EsAdmin
                }
                db.Usuarios.Add(usuario)
                db.SaveChanges()
                model.ID = usuario.ID
                Return Me.Ok(model)

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try

        End Function

        <HttpDelete>
        <Route("{id}", Name:="DeleteUsuario")>
        Public Function DeleteUsuario(id As Integer) As IHttpActionResult

            If id = 0 Then
                Return Me.Content(HttpStatusCode.NotFound, "No se puede eliminar el usuario debido a posibles dependencias asociadas.")
            End If

            Dim db As New MCEContext
            Try
                Dim usuario As Usuario = db.Usuarios.Where(Function(u) u.ID = id).SingleOrDefault

                If db.Nodos.Where(Function(n) n.Usuario.ID = usuario.ID).Any() Then
                    Return Me.Content(HttpStatusCode.BadRequest, String.Format("El usuario {0} {1} no puede eliminarse debido a que tiene nodos asociados.", usuario.Nombre, usuario.Apellido))
                End If

                db.Usuarios.Remove(usuario)
                db.SaveChanges()
                Return Me.Content(HttpStatusCode.OK, String.Format("El usuario {0} {1} fue eliminado.", usuario.Nombre, usuario.Apellido))

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try

        End Function

    End Class
End Namespace