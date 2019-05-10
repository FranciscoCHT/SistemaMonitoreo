/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Reportes {
    'use strict'
    export class HistorialIndexViewModel {

        public lectura: KnockoutObservableArray<any> = ko.observableArray<any>();
        public contador: KnockoutObservable<number> = ko.observable<number>(0);
        public start: KnockoutObservable<boolean> = ko.observable<boolean>(true);
        public nodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public reportes: KnockoutObservableArray<any> = ko.observableArray<any>();
        public reporteSelect: KnockoutObservable<any> = ko.observable<any>();
        public listNodosReporte: KnockoutObservableArray<any> = ko.observableArray<any>();
        public idReporte: KnockoutObservable<any> = ko.observable<any>(0);
        public idNodo: KnockoutObservable<any> = ko.observable<any>(-1);
        public idSector: KnockoutObservable<any> = ko.observable<any>(-1);
        public fechaReporte: KnockoutObservable<any> = ko.observable<any>();
        public fechaReporteHist: KnockoutObservable<any> = ko.observable<any>();
        public fechaStart: KnockoutObservable<any> = ko.observable<any>(null);
        public fechaEnd: KnockoutObservable<any> = ko.observable<any>(null);
        public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        getReportes(user: any): void {
            this.reportes([]);
            let url = window.location.origin + '/api/reportes/list/' + user
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
                for (var i: number = 0; i < data.length; i++) {
                    this.reportes.push({
                        ID: data[i].ID,
                        FechaHora: data[i].FechaHora,
                        FechaInicio: data[i].FechaInicio,
                        FechaTermino: data[i].FechaTermino,
                        Usuario: data[i].Usuario
                    });
                }
            })
        }

        getNodosByUser(user: any, sect: any): void {
            this.nodos([]);
            let url = window.location.origin + '/api/nodos/' + sect + '/' + user;
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
                this.nodos.push({
                    ID: -1,
                    Nombre: 'Todos'
                });
                for (var i: number = 0; i < data.length; i++) {
                    if (data[i].TipoStr == "Monitoreo") {
                        this.nodos.push({
                            ID: data[i].ID,
                            Nombre: data[i].Nombre,
                            Tipo: data[i].Tipo,
                            TipoStr: data[i].TipoStr,
                            Estado: data[i].Estado,
                            Voltaje: data[i].Voltaje,
                            Sector: data[i].Sector,
                            Usuario: data[i].Usuario
                        });
                    }
                }
                this.idNodo(this.nodos()[0].ID);
                if (this.start() == false) {
                    this.updateGridLectura();
                }
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        updateGridLectura() {
            let gridLectura = $('#gridLectura').dxDataGrid('instance');
            let gridDataSource = gridLectura.option('dataSource');
            if (this.fechaStart() != null && this.fechaEnd() != null) {
                if (this.idNodo() == -1) {
                    if (this.idSector() == -1) {
                        gridDataSource.filter([['Nodo.ID', '>', 0], "and", ['FechaHora', '>=', this.fechaStart()], "and", ['FechaHora', '<=', this.fechaEnd()]]);
                    } else {
                        gridDataSource.filter([['Nodo.SectorID', '=', this.idSector()], "and", ['FechaHora', '>=', this.fechaStart()], "and", ['FechaHora', '<=', this.fechaEnd()]]);
                    }
                } else {
                    gridDataSource.filter(['Nodo.ID', '=', this.idNodo()], "and", ['FechaHora', '>=', this.fechaStart()], "and", ['FechaHora', '<=', this.fechaEnd()]);
                }
                gridDataSource.load();
            }
        }

        getSectores(): void {
            this.sectores([]);
            let url = window.location.origin + '/api/sectores';
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
                this.sectores.push({
                    ID: -1,
                    Nombre: 'Todos'
                });
                for (var i: number = 0; i < data.length; i++) {
                    this.sectores.push({
                        ID: data[i].ID,
                        Nombre: data[i].Nombre
                    });
                }
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        constructor() {
            if (window.localStorage.getItem('user') === null || window.localStorage.getItem('user') == undefined) {
                window.location.replace(window.location.origin + '/Login');
            }
            this.getNodosByUser(window.localStorage.getItem('user'), -1);
            this.getSectores();
            this.getReportes(window.localStorage.getItem('user'));
        }

        public customStore = new DevExpress.data.CustomStore({
            load: (loadOptions: any) => {
                var defer = $.Deferred();
                $.getJSON(window.location.origin + '/api/nodos/lectura/' + window.localStorage.getItem('user') + '/' + this.idSector() + '/' + this.idNodo()).done((data) => {
                    let arrayLast: any = [];

                    for (var i: number = 0; i < data.length; i++) {
                        data[i].FechaHoraJS = new Date(data[i].FechaHora);

                        if (data[i].Dia == 24 && data[i].Mes == 3 && data[i].Año == 2019) { //dateactual.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR

                        }

                    }

                    if (this.contador() == 0) {
                        this.contador(1);
                    }
                    // Perform filtering on client side
                    var query = DevExpress.data.query(data);
                    if (loadOptions.filter) {
                        query = query.filter(loadOptions.filter);
                    }
                    defer.resolve(query.toArray());
                });
                return defer.promise();
            }
        })

        gridHistorial: any = {
            dataSource: this.reportes,
            allowColumnResizing: true,
            columnResizingMode: 'widget',
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            selection: {
                mode: "multiple",
                showCheckBoxesMode: 'onLongTap'
            },
            columns: [
                { dataField: 'ID', visible: false },
                { dataField: 'Usuario.User', caption: 'Generado por' },
                { dataField: 'FechaHora', caption: 'Fecha Reporte', width: "auto", dataType: 'date', format: 'dd/MM/yy HH:mm', sortOrder: 'asc' },
                { dataField: 'FechaInicio', caption: 'Fecha Inicio', alignment: "right", dataType: 'date', format: 'dd/MM/yy' },
                { dataField: 'FechaTermino', caption: 'Fecha Termino', alignment: "right", dataType: 'date', format: 'dd/MM/yy' }
            ],
            onContentReady: (e) => {
                e.component.element().find(".dx-datagrid-export-button").dxButton("instance").option("disabled", e.component.totalCount() === 0);
            },
            editing: {
                texts: {
                    confirmDeleteMessage: '¿Esta seguro de eliminar registro de reporte?'
                }
            },
            grouping: {
                allowCollapsing: true
            },
            export: {
                //allowExportSelectedData: true,
                enabled: true,
                fileName: 'reportes',
                excelFilterEnabled: true,
                texts: {
                    exportAll: 'Exportar todo',
                    exportSelectedRows: 'Exportar selección',
                    exportTo: 'Exportar'
                }
            },
            onExported: (e) => {
                this.fechaReporteHist(new Date().toLocaleString());
            },
            onFileSaving: (e) => {
                e.fileName = "reportes-" + this.fechaReporteHist();
            }, columnChooser: {
                allowSearch: true
            },
            showBorders: true
            , rowAlternationEnabled: true
            , showRowLines: true
            , showColumnLines: true
            , filterRow: {
                visible: true,
                showOperationChooser: true,
                applyFilter: "auto"
            },
            searchPanel: {
                visible: true,
                width: 250,
                placeholder: "Buscar..."
            },
            onRowClick: (e) => {
                this.reporteSelect({
                    ID: e.data.ID,
                    FechaHora: e.data.FechaHora,
                    FechaInicio: e.data.FechaInicio,
                    FechaTermino: e.data.FechaTermino,
                    Usuario: e.data.Usuario
                });
                this.listNodosReporte([]);
                let url = window.location.origin + '/api/reportes/' + e.data.ID;
                $.ajax({
                    type: 'GET',
                    url: url,
                }).done((data: any) => {
                    for (var i: number = 0; i < data.length; i++) {
                        this.listNodosReporte.push({
                            ID: data[i].ID,
                            Nodo: data[i].Nodo
                        });
                    }

                    var sector = {};                                // Cuenta si hay mas de un sector en los datos devueltos
                    for (var i = 0; i < data.length; i++) {         // Si hay mas de un sector, es porque se requieren todos los nodos, si no, son todos los nodos de un solo sector.
                        sector[data[i].Nodo.Sector.Nombre] = 1 + (sector[data[i].Nodo.Sector.Nombre] || 0);
                    }

                    let gridLectura = $('#gridLectura').dxDataGrid('instance');
                    let gridDataSource = gridLectura.option('dataSource');
                    if (this.reporteSelect().FechaInicio != null && this.reporteSelect().FechaTermino != null) {
                        if (data.length != 1) {
                            if (Object.keys(sector).length > 1) {
                                gridDataSource.filter([['Nodo.ID', '>', 0], "and", ['FechaHora', '>=', new Date(this.reporteSelect().FechaInicio)], "and", ['FechaHora', '<=', new Date(this.reporteSelect().FechaTermino)]]);
                            } else {
                                gridDataSource.filter([['Nodo.SectorID', '=', this.listNodosReporte()[0].Nodo.Sector.ID], "and", ['FechaHora', '>=', new Date(this.reporteSelect().FechaInicio)], "and", ['FechaHora', '<=', new Date(this.reporteSelect().FechaTermino)]]);
                            }
                        } else {
                            gridDataSource.filter(['Nodo.ID', '=', this.listNodosReporte()[0].Nodo.ID], "and", ['FechaHora', '>=', new Date(this.reporteSelect().FechaInicio)], "and", ['FechaHora', '<=', new Date(this.reporteSelect().FechaTermino)]);
                        }
                        gridDataSource.load();
                    }
                    var id = this.reporteSelect().ID;
                    var fechahora = new Date(this.reporteSelect().FechaHora).toLocaleString();
                    var fechainicio = new Date(this.reporteSelect().FechaInicio).toLocaleString();
                    var fechatermino = new Date(this.reporteSelect().FechaTermino).toLocaleString();
                    var usuario = this.reporteSelect().Usuario.User;
                    var mesa = {},
                        popup = null,
                        popupOptions = {
                            visible: false,
                            width: "400",
                            height: "auto",
                            position: {
                                my: 'center',
                                at: 'center',
                                of: window
                            },
                            dragEnabled: true,
                            closeOnOutsideClick: true,
                            showTitle: true,
                            contentTemplate: () => {
                                return $("<div />").css("padding-left", "20px").css("padding-right", "20px").append(
                                    $("<p><b>ID Reporte:</b> <span>" + id + "</span></p>"),
                                    $("<p><b>Hora del reporte:</b> <span>" + fechahora + "</span></p>"),
                                    $("<p><b>Inicio Lecturas:</b> <span>" + fechainicio + "</span></p>"),
                                    $("<p><b>Termino Lecturas:</b> <span>" + fechatermino + "</span></p>"),
                                    $("<p><b>Generado por:</b> <span>" + usuario + "</span></p>"),
                                    $("<hr>").css("border-top", "1px dotted #8c8b8b"),
                                    $("<div>").attr("id", "gridNodosReporte").dxDataGrid({
                                        dataSource: this.listNodosReporte,
                                        loadPanel: {
                                            enabled: true,
                                            text: 'Cargando datos...'
                                        },
                                        selection: {
                                            mode: "single"
                                        },
                                        columnAutoWidth: true,
                                        columns: [{ dataField: 'ID', visible: false },
                                        { dataField: 'Nodo.ID', alignment: "center", caption: 'ID' },
                                        { dataField: 'Nodo.Nombre', caption: 'Nombre' },
                                        { dataField: 'Nodo.Sector.Nombre', caption: 'Sector' }
                                        ],
                                        grouping: {
                                            allowCollapsing: true
                                        },
                                        showBorders: false
                                        , rowAlternationEnabled: false
                                        , showRowLines: false
                                        , showColumnLines: false
                                    })
                                )
                            },
                            toolbarItems: [{
                                toolbar: 'top',
                                text: "Detalle del reporte",
                                location: "center"
                            }, {
                                widget: "dxButton",
                                toolbar: 'bottom',
                                location: "center",
                                options: {
                                    text: "Descargar",
                                    icon: "plus",
                                    type: 'default',
                                    onClick: () => {
                                        let grid = $('#gridLectura').dxDataGrid('instance');
                                        if (grid.totalCount() != 0) { // Innecesario? ya se hace antes al crear reporte esta restricción
                                            grid.exportToExcel(false);
                                        }
                                        
                                    }
                                }
                            }]
                        };

                    if (popup) {
                        $(".nodoPopup").remove();
                    }
                    var $popupContainer = $("<div />")
                        .addClass("nodoPopup")
                        .appendTo($("#nodoPopup"));
                    popup = $popupContainer.dxPopup(popupOptions).dxPopup("instance");
                    popup.show();
                })
            }
        };

        gridLectura: any = {
            dataSource: new DevExpress.data.DataSource({
                store: this.customStore,
                filter: ['Año', '=', 0]
            }),
            allowColumnResizing: true,
            columnResizingMode: 'widget',
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            selection: {
                mode: "multiple",
                showCheckBoxesMode: 'onLongTap'
            },
            columns: [
                { dataField: 'ID', visible: false },
                { dataField: 'Nodo.Nombre', caption: 'Nodo', width: "auto" },
                { dataField: 'FechaHora', caption: 'Fecha', width: "auto", dataType: 'date', format: 'dd/MM/yy HH:mm', sortOrder: 'asc' },
                'Irms',
                'Watt',
                { dataField: 'Kwh', caption: 'Kilowatt Hora' },
                { dataField: 'Precio', caption: 'Precio ($)', format: { type: 'currency', precision: 2 } }
            ],
            onContentReady: (e) => {
                e.component.element().find(".dx-datagrid-export-button").dxButton("instance").option("disabled", e.component.totalCount() === 0);
            },
            editing: {
                texts: {
                    confirmDeleteMessage: '¿Esta seguro de eliminar registro de usuario?'
                }
            },
            grouping: {
                allowCollapsing: true
            },
            export: {
                //allowExportSelectedData: true,
                enabled: true,
                fileName: 'lecturas',
                excelFilterEnabled: true,
                texts: {
                    exportAll: 'Exportar todo',
                    exportSelectedRows: 'Exportar selección',
                    exportTo: 'Exportar'
                }
            },
            onExported: (e) => {
                this.fechaReporte(new Date().toLocaleString());
            },
            onFileSaving: (e) => {
                e.fileName = "lecturas-" + this.fechaReporte();
            }, columnChooser: {
                allowSearch: true
            },
            showBorders: true
            , rowAlternationEnabled: true
            , showRowLines: true
            , showColumnLines: true
            , filterRow: {
                visible: true,
                showOperationChooser: true,
                applyFilter: "auto"
            },
            summary: {
                totalItems: [{
                    column: "FechaHora",
                    summaryType: "count",
                    customizeText: (e) => {
                        return "Lecturas: " + e.value
                    }
                }, {
                    column: "Irms",
                    summaryType: "sum",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    customizeText: (e) => {
                        return "Total: " + e.valueText
                    }
                }, {
                    column: "Watt",
                    summaryType: "sum",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    customizeText: (e) => {
                        return "Total: " + e.valueText
                    }
                }, {
                    column: "Kwh",
                    summaryType: "sum",
                    valueFormat: { type: "fixedPoint", precision: 2 },
                    customizeText: (e) => {
                        return "Total: " + e.valueText
                    }
                }, {
                    column: "Precio",
                    summaryType: "sum",
                    valueFormat: "currency",
                    customizeText: (e) => {
                        return "Total: " + e.valueText
                    }
                }],
                texts: {
                    count: "",
                    sum: "",
                }
            },
            searchPanel: {
                visible: true,
                width: 250,
                placeholder: "Buscar..."
            },
            onRowClick: (e) => {
                this.enable(false);
            }
        };
    }
}