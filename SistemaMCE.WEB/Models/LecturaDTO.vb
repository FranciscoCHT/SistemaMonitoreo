Namespace Models
    Public Class LecturaDTO
        Public Property ID As Integer
        Public Property Irms As Decimal
        Public Property Watt As Decimal
        Public Property Kwh As Decimal
        Public Property Precio As Decimal
        Public Property FechaHora As Date
        Public Property FechaHoraUTC As Date
        Public Property FechaHoraString As String
        Public Overridable Property Nodo As NodoDTO
    End Class
End Namespace
