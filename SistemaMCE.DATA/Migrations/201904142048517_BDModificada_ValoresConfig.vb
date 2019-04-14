Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class BDModificada_ValoresConfig
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Lectura", "Watt", Function(c) c.Decimal(nullable := False, precision := 18, scale := 10))
            AddColumn("dbo.Lectura", "Kwh", Function(c) c.Decimal(nullable := False, precision := 18, scale := 10))
            AddColumn("dbo.Lectura", "Precio", Function(c) c.Decimal(nullable := False, precision := 18, scale := 10))
            AddColumn("dbo.Usuario", "EsAdmin", Function(c) c.Boolean(nullable := False))
            AlterColumn("dbo.Lectura", "Irms", Function(c) c.Decimal(nullable := False, precision := 18, scale := 10))
            AlterColumn("dbo.Nodo", "Tipo", Function(c) c.Int(nullable := False))
            AlterColumn("dbo.Nodo", "Estado", Function(c) c.Boolean(nullable := False))
            DropColumn("dbo.Lectura", "Potencia")
        End Sub
        
        Public Overrides Sub Down()
            AddColumn("dbo.Lectura", "Potencia", Function(c) c.Decimal(nullable := False, precision := 18, scale := 2))
            AlterColumn("dbo.Nodo", "Estado", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Nodo", "Tipo", Function(c) c.String(unicode := false))
            AlterColumn("dbo.Lectura", "Irms", Function(c) c.Decimal(nullable := False, precision := 18, scale := 2))
            DropColumn("dbo.Usuario", "EsAdmin")
            DropColumn("dbo.Lectura", "Precio")
            DropColumn("dbo.Lectura", "Kwh")
            DropColumn("dbo.Lectura", "Watt")
        End Sub
    End Class
End Namespace
