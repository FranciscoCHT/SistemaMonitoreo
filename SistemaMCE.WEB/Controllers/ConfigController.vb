Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("config")>
    Public Class ConfigController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace