Imports System
Imports System.Data.Entity
Imports System.Data.Entity.Migrations
Imports System.Linq

Namespace Migrations

    Friend NotInheritable Class Configuration 
        Inherits DbMigrationsConfiguration(Of Model.MCEContext)

        Public Sub New()
            AutomaticMigrationsEnabled = False

            SetSqlGenerator("MySql.Data.MySqlClient", New MySql.Data.Entity.MySqlMigrationSqlGenerator())
        End Sub

        Protected Overrides Sub Seed(context As Model.MCEContext)
            '  This method will be called after migrating to the latest version.

            '  You can use the DbSet(Of T).AddOrUpdate() helper extension method 
            '  to avoid creating duplicate seed data.
        End Sub

    End Class

End Namespace
