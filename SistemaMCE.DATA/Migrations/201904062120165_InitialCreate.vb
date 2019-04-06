Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class InitialCreate
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.Lectura",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Potencia = c.Decimal(nullable := False, precision := 18, scale := 2),
                        .Irms = c.Decimal(nullable := False, precision := 18, scale := 2),
                        .FechaHora = c.DateTime(nullable := False),
                        .Nodo_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Nodo", Function(t) t.Nodo_ID) _
                .Index(Function(t) t.Nodo_ID)
            
            CreateTable(
                "dbo.Nodo",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String(),
                        .Tipo = c.String(),
                        .Estado = c.String(),
                        .Voltaje = c.Int(nullable := False),
                        .Sector_ID = c.Int(),
                        .Usuario_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Sector", Function(t) t.Sector_ID) _
                .ForeignKey("dbo.Usuario", Function(t) t.Usuario_ID) _
                .Index(Function(t) t.Sector_ID) _
                .Index(Function(t) t.Usuario_ID)
            
            CreateTable(
                "dbo.Sector",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String()
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
            CreateTable(
                "dbo.Usuario",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String(),
                        .Apellido = c.String(),
                        .User = c.String(),
                        .Pass = c.String()
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.Nodo", "Usuario_ID", "dbo.Usuario")
            DropForeignKey("dbo.Nodo", "Sector_ID", "dbo.Sector")
            DropForeignKey("dbo.Lectura", "Nodo_ID", "dbo.Nodo")
            DropIndex("dbo.Nodo", New String() { "Usuario_ID" })
            DropIndex("dbo.Nodo", New String() { "Sector_ID" })
            DropIndex("dbo.Lectura", New String() { "Nodo_ID" })
            DropTable("dbo.Usuario")
            DropTable("dbo.Sector")
            DropTable("dbo.Nodo")
            DropTable("dbo.Lectura")
        End Sub
    End Class
End Namespace
