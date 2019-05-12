Namespace Model
    Public Class Sector
        Public Property ID As Integer
        Public Property Nombre As String
        Public Property FechaCreacion As Date
        Public Property Codigo As String

        Public Overridable Property Nodos As IList(Of Nodo)
    End Class
End Namespace
