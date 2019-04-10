Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("sectores")>
    Public Class SectoresController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace