﻿Namespace Models
    Public Class NodoDTO
        Public Property ID As Integer
        Public Property Nombre As String
        Public Property Tipo As String
        Public Property Estado As String
        Public Property Voltaje As Integer
        Public Overridable Property Sector As SectorDTO
        Public Overridable Property SectorID As Integer
        Public Overridable Property Usuario As UsuarioDTO
        Public Overridable Property UsuarioID As Integer
    End Class
End Namespace
