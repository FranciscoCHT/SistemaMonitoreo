Imports System.Net
Imports System.Web.Http
Imports SistemaMCE.DATA.Model

Namespace Controllers.API
    <RoutePrefix("api/sectores")>
    Public Class SectoresAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetSectores")>
        Public Function GetSectores() As IHttpActionResult

            Dim db As New MCEContext
            Try
                Dim listSectores As List(Of Sector) = db.Sectores.ToList()
                If listSectores Is Nothing OrElse listSectores.Count = 0 Then Return Me.Ok(New List(Of Models.SectorDTO))
                Dim listSectorDto As New List(Of Models.SectorDTO)

                For Each sector As Sector In listSectores
                    listSectorDto.Add(New Models.SectorDTO With {.ID = sector.ID,
                                                                .Nombre = sector.Nombre,
                                                                .Codigo = sector.Codigo,
                                                                .FechaCreacion = sector.FechaCreacion})
                Next
                Return Me.Ok(listSectorDto)

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="PostSectores")>
        Public Function PostSectores(<FromBody> model As Models.SectorDTO) As IHttpActionResult

            If model Is Nothing Then Return Me.Content(HttpStatusCode.BadRequest, "Error al obtener información.")

            Dim db As New MCEContext
            Try
                Dim usuarioAdmin As Usuario = db.Usuarios.Where(Function(u) u.User = model.UsuarioLogin).SingleOrDefault()
                If usuarioAdmin.EsAdmin = False Then
                    Return Me.Content(HttpStatusCode.BadRequest, "No tiene privilegios para manejar esta operación.")
                End If

                If model.ID <> 0 Then
                    Dim sectorExist As Sector = db.Sectores.Where(Function(s) s.ID = model.ID).SingleOrDefault()
                    With sectorExist
                        .Nombre = model.Nombre
                        .Codigo = model.Codigo
                    End With
                    db.SaveChanges()
                    Return Me.Ok(model)
                End If

                If db.Sectores.Where(Function(s) s.Nombre = model.Nombre).Any Then
                    Return Me.Content(HttpStatusCode.BadRequest, "Este sector ya existe.")
                End If

                Dim sector As New Sector With {.Nombre = model.Nombre,
                                               .Codigo = model.Codigo,
                                               .FechaCreacion = Date.Now}

                db.Sectores.Add(sector)
                db.SaveChanges()
                model.ID = sector.ID
                Return Me.Ok(model)

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try

        End Function

        <HttpDelete>
        <Route("{user}/{id}", Name:="DeleteSector")>
        Public Function DeleteSector(user As String, id As Integer) As IHttpActionResult

            If id = 0 Then
                Return Me.Content(HttpStatusCode.NotFound, "No se puede eliminar el sector debido a posibles dependencias asociadas.")
            End If

            Dim db As New MCEContext
            Try
                Dim usuarioAdmin As Usuario = db.Usuarios.Where(Function(u) u.User = user).SingleOrDefault()
                If usuarioAdmin.EsAdmin = False Then
                    Return Me.Content(HttpStatusCode.BadRequest, "No tiene privilegios para manejar esta operación.")
                End If

                Dim sector As Sector = db.Sectores.Where(Function(s) s.ID = id).SingleOrDefault

                If db.Nodos.Where(Function(n) n.Sector.ID = sector.ID).Any() Then
                    Return Me.Content(HttpStatusCode.BadRequest, String.Format("El sector {0} no puede eliminarse debido a que tiene nodos asociados.", sector.Nombre))
                End If

                db.Sectores.Remove(sector)
                db.SaveChanges()
                Return Me.Content(HttpStatusCode.OK, String.Format("El sector {0} fue eliminado.", sector.Nombre))

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try

        End Function

    End Class
End Namespace