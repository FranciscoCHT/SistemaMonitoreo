Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class EstadoABoolean
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AlterColumn("dbo.Nodo", "Estado", Function(c) c.Boolean(nullable := False))
        End Sub
        
        Public Overrides Sub Down()
            AlterColumn("dbo.Nodo", "Estado", Function(c) c.String(unicode := false))
        End Sub
    End Class
End Namespace
