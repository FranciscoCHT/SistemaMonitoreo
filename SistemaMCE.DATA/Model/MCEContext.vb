﻿Imports System
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

        Protected Overrides Sub OnModelCreating(modelBuilder As DbModelBuilder)
            MyBase.OnModelCreating(modelBuilder)
            modelBuilder.Conventions.Remove(Of PluralizingTableNameConvention)()
            modelBuilder.Conventions.Remove(Of OneToManyCascadeDeleteConvention)()
            modelBuilder.Conventions.Remove(Of ManyToManyCascadeDeleteConvention)()
        End Sub

    End Class
End Namespace
