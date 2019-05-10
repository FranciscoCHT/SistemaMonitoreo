Namespace Models
    Public Class NodoReporteDTO
        Public Property ID As Integer
        Public Overridable Property Reporte As ReporteDTO
        Public Overridable Property ReporteID As Integer
        Public Overridable Property Nodo As NodoDTO
        Public Overridable Property NodoID As Integer
    End Class

    Public Class ListNodoReport
        Public Property ID As Integer
        Public Property ListNodoReportDTO As List(Of NodoReporteDTO)
    End Class
End Namespace
