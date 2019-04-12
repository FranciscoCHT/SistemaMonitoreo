Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("nodos")>
    Public Class NodosController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace