Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class addDatesReporte
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Reporte", "FechaInicio", Function(c) c.DateTime(nullable := False, precision := 0))
            AddColumn("dbo.Reporte", "FechaTermino", Function(c) c.DateTime(nullable := False, precision := 0))
        End Sub
        
        Public Overrides Sub Down()
            DropColumn("dbo.Reporte", "FechaTermino")
            DropColumn("dbo.Reporte", "FechaInicio")
        End Sub
    End Class
End Namespace
