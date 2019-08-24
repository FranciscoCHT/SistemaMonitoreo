Imports System.Net
Imports System.Web.Http
Imports SistemaMCE.DATA.Model

Namespace Controllers.API
    <RoutePrefix("api/home")>
    Public Class HomeAPIController
        Inherits ApiController

        <HttpGet>
        <Route("{user}", Name:="getConf")>
        Public Function getConf(user As String) As IHttpActionResult

            Dim db As New MCEContext
            Try
                Dim usuarioAdmin As Usuario = db.Usuarios.Where(Function(u) u.User = user).SingleOrDefault()
                If usuarioAdmin.EsAdmin = True Then
                    Dim thefile As String = "D:\U\XV Actividad de Titulación\Arduino\SCT-013\MoniControlProcessing\configuracion.txt"
                    Dim lines() As String = System.IO.File.ReadAllLines(thefile)
                    Dim linea1 As String() = lines(1).Split(New Char() {":"c})
                    Dim linea2 As String() = lines(3).Split(New Char() {":"c})
                    Dim nLectura As String = Trim(linea1(1))
                    Dim precioKwh As String = Trim(linea2(1))
                    Dim valores = {nLectura, precioKwh}
                    Return Me.Ok(valores)
                Else
                    Return Me.Ok()
                End If

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="PostConf")>
        Public Function PostConf(<FromBody> model As Models.ConfigDTO) As IHttpActionResult

            If model Is Nothing Then Return Me.Content(HttpStatusCode.BadRequest, "Error al obtener información.")

            Dim db As New MCEContext
            Try
                Dim usuarioAdmin As Usuario = db.Usuarios.Where(Function(u) u.User = model.UsuarioLogin).SingleOrDefault()
                If usuarioAdmin.EsAdmin = True Then
                    Dim thefile As String = "D:\U\XV Actividad de Titulación\Arduino\SCT-013\MoniControlProcessing\configuracion.txt"
                    Dim lines() As String = System.IO.File.ReadAllLines("D:\U\XV Actividad de Titulación\Arduino\SCT-013\MoniControlProcessing\configuracion.txt")
                    lines(1) = "nLectura: " + model.NLectura
                    lines(3) = "precioKwh: " + model.PrecioKwh
                    System.IO.File.WriteAllLines(thefile, lines)
                    Return Me.Ok("OK")
                Else
                    Return Me.Ok()
                End If

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace