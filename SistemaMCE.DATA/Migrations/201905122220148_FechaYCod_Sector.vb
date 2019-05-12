Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class FechaYCod_Sector
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Sector", "FechaCreacion", Function(c) c.DateTime(nullable := False, precision := 0))
            AddColumn("dbo.Sector", "Codigo", Function(c) c.String(unicode := false))
        End Sub
        
        Public Overrides Sub Down()
            DropColumn("dbo.Sector", "Codigo")
            DropColumn("dbo.Sector", "FechaCreacion")
        End Sub
    End Class
End Namespace
