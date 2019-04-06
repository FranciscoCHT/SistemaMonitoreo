Namespace Model
    Public Class Usuario
        Public Property ID As Integer
        Public Property Nombre As String
        Public Property Apellido As String
        Public Property User As String
        Public Property Pass As String

        Public Overridable Property Nodos As IList(Of Nodo)
    End Class
End Namespace
