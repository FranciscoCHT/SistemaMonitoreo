Namespace Model
    Public Class Reporte
        Public Property ID As Integer
        Public Property FechaHora As Date
        Public Property FechaInicio As Date
        Public Property FechaTermino As Date
        Public Overridable Property Usuario As Usuario

        Public Overridable Property NodoReportes As IList(Of NodoReporte)
    End Class
End Namespace

