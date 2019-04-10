Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class esAdmin_agregado
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Usuario", "EsAdmin", Function(c) c.Boolean(nullable := False))
        End Sub
        
        Public Overrides Sub Down()
            DropColumn("dbo.Usuario", "EsAdmin")
        End Sub
    End Class
End Namespace
