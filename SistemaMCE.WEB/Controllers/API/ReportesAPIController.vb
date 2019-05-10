Imports System.Net
Imports System.Web.Http
Imports SistemaMCE.DATA.Model

Namespace Controllers.API
    <RoutePrefix("api/reportes")>
    Public Class ReportesAPIController
        Inherits ApiController

        <HttpGet>
        <Route("list/{user}", Name:="getReportes")>
        Public Function getReportes(user As String) As IHttpActionResult

            Dim db As New MCEContext
            Try
                Dim listReporte As List(Of Reporte) = Nothing
                Dim listReporteDto As New List(Of Models.ReporteDTO)
                Dim usuarioAdmin As Usuario = db.Usuarios.Where(Function(u) u.User = user).SingleOrDefault()
                If usuarioAdmin.EsAdmin = True Then
                    listReporte = db.Reportes.ToList()
                Else
                    listReporte = db.Reportes.Where(Function(r) r.Usuario.User = user).ToList()
                End If

                If listReporte Is Nothing OrElse listReporte.Count = 0 Then Return Me.Ok(New List(Of Models.ReporteDTO))

                For Each reporte As Reporte In listReporte
                    listReporteDto.Add(New Models.ReporteDTO With {.ID = reporte.ID,
                                                            .FechaHora = reporte.FechaHora,
                                                            .FechaInicio = reporte.FechaInicio,
                                                            .FechaTermino = reporte.FechaTermino,
                                                            .Usuario = New Models.UsuarioDTO With {.ID = reporte.Usuario.ID,
                                                                                             .Nombre = reporte.Usuario.Nombre,
                                                                                             .Apellido = reporte.Usuario.Apellido,
                                                                                             .User = reporte.Usuario.User,
                                                                                             .EsAdmin = reporte.Usuario.EsAdmin}
                                  })
                Next
                Return Me.Ok(listReporteDto)

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="PostReporte")>
        Public Function PostReporte(<FromBody> model As Models.ReporteDTO) As IHttpActionResult

            If model Is Nothing Then Return Me.Content(HttpStatusCode.BadRequest, "Error al obtener información.")

            Dim db As New MCEContext
            Try
                Dim reporte As New Reporte With {.FechaHora = DateTime.Parse(model.FechaHora),
                                                .FechaInicio = DateTime.Parse(model.FechaInicio),
                                                .FechaTermino = DateTime.Parse(model.FechaTermino),
                                                .Usuario = db.Usuarios.Where(Function(u) u.User = model.UsuarioLogin).SingleOrDefault()
                }
                db.Reportes.Add(reporte)

                db.SaveChanges()
                model.ID = reporte.ID
                model.Usuario = New Models.UsuarioDTO With {.ID = reporte.Usuario.ID, .Nombre = reporte.Usuario.Nombre, .Apellido = reporte.Usuario.Apellido, .User = reporte.Usuario.User, .EsAdmin = reporte.Usuario.EsAdmin}
                Return Me.Ok(model)

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpGet>
        <Route("{id}", Name:="GetNodosReporte")>
        Public Function GetNodosReporte(id As Integer) As IHttpActionResult

            Dim db As New MCEContext
            Try
                Dim listNodosReporte As List(Of NodoReporte) = Nothing
                Dim listNodosReporteDto As New List(Of Models.NodoReporteDTO)

                listNodosReporte = db.NodoReportes.Where(Function(n) n.Reporte.ID = id).ToList()

                If listNodosReporte Is Nothing OrElse listNodosReporte.Count = 0 Then Return Me.Ok(New List(Of Models.NodoReporteDTO))

                For Each nodoreporte As NodoReporte In listNodosReporte

                    listNodosReporteDto.Add(New Models.NodoReporteDTO With {.ID = nodoreporte.ID,
                                                                .Nodo = New Models.NodoDTO With {.ID = nodoreporte.Nodo.ID,
                                                                                             .Nombre = nodoreporte.Nodo.Nombre,
                                                                                             .Sector = New Models.SectorDTO With {.ID = nodoreporte.Nodo.Sector.ID,
                                                                                                                                .Nombre = nodoreporte.Nodo.Sector.Nombre}}
                                      })
                Next
                Return Me.Ok(listNodosReporteDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("nodoReporte", Name:="PostNodoReporte")>
        Public Function PostNodoReporte(<FromBody> model As Models.ListNodoReport) As IHttpActionResult

            Dim nodoR As NodoReporte = Nothing
            If model Is Nothing Then Return Me.Content(HttpStatusCode.BadRequest, "Error al obtener información.")

            Dim db As New MCEContext
            Try
                For Each nodoReporte As Models.NodoReporteDTO In model.ListNodoReportDTO
                    nodoR = db.NodoReportes.Create()
                    With nodoR
                        .Nodo = db.Nodos.Where(Function(n) n.ID = nodoReporte.NodoID).SingleOrDefault()
                        .Reporte = db.Reportes.Where(Function(r) r.ID = model.ID).SingleOrDefault()
                    End With
                    db.NodoReportes.Add(nodoR)
                    db.SaveChanges()
                    nodoReporte.Reporte = New Models.ReporteDTO With {.ID = nodoR.Reporte.ID}
                    nodoReporte.Nodo = New Models.NodoDTO With {.ID = nodoR.Nodo.ID, .Nombre = nodoR.Nodo.Nombre, .TipoStr = nodoR.Nodo.Tipo.ToString}
                Next
                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function
    End Class
End Namespace