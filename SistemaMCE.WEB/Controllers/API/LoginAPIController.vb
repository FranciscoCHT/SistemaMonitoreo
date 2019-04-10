Imports System.Net
Imports System.Web.Http
Imports SistemaMCE.DATA.Model

Namespace Controllers.API
    <RoutePrefix("api/login")>
    Public Class LoginAPIController
        Inherits ApiController

        <HttpPost>
        <Route("", Name:="PostLogin")>
        Public Function PostLogin(<FromBody> model As Models.UsuarioDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If

            Dim db As New MCEContext
            Try

                Dim user As Usuario = db.Usuarios.Where(Function(u) u.User = model.User And u.Pass = model.Pass).SingleOrDefault()
                If user Is Nothing Then Return Me.Content(HttpStatusCode.Unauthorized, "Usuario o Contraseña inválidos")

                With model
                    .User = user.User
                    .Pass = user.Pass
                End With

                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace