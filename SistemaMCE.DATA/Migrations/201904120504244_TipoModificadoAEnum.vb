Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class TipoModificadoAEnum
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AlterColumn("dbo.Nodo", "Tipo", Function(c) c.Int(nullable := False))
        End Sub
        
        Public Overrides Sub Down()
            AlterColumn("dbo.Nodo", "Tipo", Function(c) c.String(unicode := false))
        End Sub
    End Class
End Namespace
