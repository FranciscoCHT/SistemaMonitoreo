Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class VoltajeADecimal
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AlterColumn("dbo.Nodo", "Voltaje", Function(c) c.Decimal(nullable := False, precision := 18, scale := 2))
        End Sub
        
        Public Overrides Sub Down()
            AlterColumn("dbo.Nodo", "Voltaje", Function(c) c.Int(nullable := False))
        End Sub
    End Class
End Namespace
