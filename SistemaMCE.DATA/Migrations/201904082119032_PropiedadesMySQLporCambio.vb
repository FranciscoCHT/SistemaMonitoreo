Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class PropiedadesMySQLporCambio
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AlterColumn("dbo.Lectura", "FechaHora", Function(c) c.DateTime(nullable := False, precision := 0))
            AlterColumn("dbo.Nodo", "Nombre", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Nodo", "Tipo", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Nodo", "Estado", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Sector", "Nombre", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Usuario", "Nombre", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Usuario", "Apellido", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Usuario", "User", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Usuario", "Pass", Function(c) c.String(unicode := false))
        End Sub
        
        Public Overrides Sub Down()
            AlterColumn("dbo.Usuario", "Pass", Function(c) c.String())
            AlterColumn("dbo.Usuario", "User", Function(c) c.String())
            AlterColumn("dbo.Usuario", "Apellido", Function(c) c.String())
            AlterColumn("dbo.Usuario", "Nombre", Function(c) c.String())
            AlterColumn("dbo.Sector", "Nombre", Function(c) c.String())
            AlterColumn("dbo.Nodo", "Estado", Function(c) c.String())
            AlterColumn("dbo.Nodo", "Tipo", Function(c) c.String())
            AlterColumn("dbo.Nodo", "Nombre", Function(c) c.String())
            AlterColumn("dbo.Lectura", "FechaHora", Function(c) c.DateTime(nullable := False))
        End Sub
    End Class
End Namespace
