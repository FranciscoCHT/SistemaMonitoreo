﻿Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("login")>
    Public Class LoginController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace