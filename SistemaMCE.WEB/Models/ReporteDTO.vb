Namespace Models
    Public Class ReporteDTO
        Public Property ID As Integer
        Public Property FechaHora As Date
        Public Property FechaInicio As Date
        Public Property FechaTermino As Date
        Public Overridable Property Usuario As UsuarioDTO
        Public Overridable Property UsuarioLogin As String
    End Class
End Namespace
