Namespace Model
    Public Class Lectura
        Public Property ID As Integer
        Public Property Irms As Decimal
        Public Property Watt As Decimal
        Public Property Kwh As Decimal
        Public Property Precio As Decimal
        Public Property FechaHora As Date
        Public Overridable Property Nodo As Nodo
    End Class
End Namespace
