Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("reportes")>
    Public Class ReportesController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace