﻿Namespace Model
    Public Class Nodo
        Public Property ID As Integer
        Public Property Nombre As String
        Public Property Tipo As Tipo
        Public Property Estado As Boolean
        Public Property Voltaje As Decimal
        Public Property FCalibracion As Decimal
        Public Overridable Property Sector As Sector
        Public Overridable Property Usuario As Usuario

        Public Overridable Property Lecturas As IList(Of Lectura)
        Public Overridable Property NodoReportes As IList(Of NodoReporte)
    End Class
End Namespace
