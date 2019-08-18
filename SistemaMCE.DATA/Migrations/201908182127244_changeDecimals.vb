Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class changeDecimals
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AlterColumn("dbo.Lectura", "Irms", Function(c) c.Decimal(nullable := False, precision := 18, scale := 9))
            AlterColumn("dbo.Lectura", "Watt", Function(c) c.Decimal(nullable := False, precision := 18, scale := 9))
            AlterColumn("dbo.Lectura", "Kwh", Function(c) c.Decimal(nullable := False, precision := 18, scale := 9))
            AlterColumn("dbo.Lectura", "Precio", Function(c) c.Decimal(nullable := False, precision := 18, scale := 9))
        End Sub
        
        Public Overrides Sub Down()
            AlterColumn("dbo.Lectura", "Precio", Function(c) c.Decimal(nullable := False, precision := 18, scale := 10))
            AlterColumn("dbo.Lectura", "Kwh", Function(c) c.Decimal(nullable := False, precision := 18, scale := 10))
            AlterColumn("dbo.Lectura", "Watt", Function(c) c.Decimal(nullable := False, precision := 18, scale := 10))
            AlterColumn("dbo.Lectura", "Irms", Function(c) c.Decimal(nullable := False, precision := 18, scale := 10))
        End Sub
    End Class
End Namespace
