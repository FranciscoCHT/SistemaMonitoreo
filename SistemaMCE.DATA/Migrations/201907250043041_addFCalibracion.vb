Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class addFCalibracion
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Nodo", "FCalibracion", Function(c) c.Decimal(nullable := False, precision := 18, scale := 2))
        End Sub
        
        Public Overrides Sub Down()
            DropColumn("dbo.Nodo", "FCalibracion")
        End Sub
    End Class
End Namespace
