Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class ReporteNodosTable
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.NodoReporte",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nodo_ID = c.Int(),
                        .Reporte_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Nodo", Function(t) t.Nodo_ID) _
                .ForeignKey("dbo.Reporte", Function(t) t.Reporte_ID) _
                .Index(Function(t) t.Nodo_ID) _
                .Index(Function(t) t.Reporte_ID)
            
            CreateTable(
                "dbo.Reporte",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .FechaHora = c.DateTime(nullable := False, precision := 0),
                        .Usuario_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Usuario", Function(t) t.Usuario_ID) _
                .Index(Function(t) t.Usuario_ID)
            
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.Reporte", "Usuario_ID", "dbo.Usuario")
            DropForeignKey("dbo.NodoReporte", "Reporte_ID", "dbo.Reporte")
            DropForeignKey("dbo.NodoReporte", "Nodo_ID", "dbo.Nodo")
            DropIndex("dbo.Reporte", New String() { "Usuario_ID" })
            DropIndex("dbo.NodoReporte", New String() { "Reporte_ID" })
            DropIndex("dbo.NodoReporte", New String() { "Nodo_ID" })
            DropTable("dbo.Reporte")
            DropTable("dbo.NodoReporte")
        End Sub
    End Class
End Namespace
