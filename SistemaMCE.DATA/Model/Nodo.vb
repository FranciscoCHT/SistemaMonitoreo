Namespace Model
    Public Class Nodo
        Public Property ID As Integer
        Public Property Nombre As String
        Public Property Tipo As Tipo
        Public Property Estado As Boolean
        Public Property Voltaje As Integer
        Public Overridable Property Sector As Sector
        Public Overridable Property Usuario As Usuario

        Public Overridable Property Lecturas As IList(Of Lectura)
    End Class
End Namespace
