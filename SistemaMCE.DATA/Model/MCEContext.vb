Imports System
Imports System.Data.Entity
Imports System.Data.Entity.ModelConfiguration.Conventions
Imports System.Linq
Imports SistemaMCE.DATA.Model

Namespace Model
    Public Class MCEContext
        Inherits DbContext

        Public Sub New()
            MyBase.New("name=MCEContext")
        End Sub

        Public Overridable Property Usuarios As DbSet(Of Usuario)
        Public Overridable Property Nodos As DbSet(Of Nodo)
        Public Overridable Property Sectores As DbSet(Of Sector)
        Public Overridable Property Lecturas As DbSet(Of Lectura)
        Public Overridable Property Reportes As DbSet(Of Reporte)
        Public Overridable Property NodoReportes As DbSet(Of NodoReporte)

        Protected Overrides Sub OnModelCreating(modelBuilder As DbModelBuilder)
            MyBase.OnModelCreating(modelBuilder)
            modelBuilder.Conventions.Remove(Of PluralizingTableNameConvention)()
            modelBuilder.Conventions.Remove(Of OneToManyCascadeDeleteConvention)()
            modelBuilder.Conventions.Remove(Of ManyToManyCascadeDeleteConvention)()
            modelBuilder.Entity(Of Lectura)().Property(Function(p) p.Irms).HasPrecision(18, 9)
            modelBuilder.Entity(Of Lectura)().Property(Function(p) p.Kwh).HasPrecision(18, 9)
            modelBuilder.Entity(Of Lectura)().Property(Function(p) p.Precio).HasPrecision(18, 9)
            modelBuilder.Entity(Of Lectura)().Property(Function(p) p.Watt).HasPrecision(18, 9)
        End Sub

    End Class
End Namespace
