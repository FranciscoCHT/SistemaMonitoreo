Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("control")>
    Public Class ControlController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace