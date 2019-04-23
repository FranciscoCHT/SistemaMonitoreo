Namespace Models
    Public Class LecturaDTO
        Public Property ID As Integer
        Public Property Irms As Decimal
        Public Property Watt As Decimal
        Public Property Kwh As Decimal
        Public Property Precio As Decimal
        Public Property FechaHora As Date
        Public Property FechaHoraJS As Date
        Public Property FechaHoraString As String
        Public Property Dia As Integer
        Public Property Mes As Integer
        Public Property Año As Integer
        Public Overridable Property Nodo As NodoDTO
    End Class
End Namespace
