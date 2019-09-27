/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Reportes {
    'use strict'
    export class ReportesIndexViewModel {

        public lectura: KnockoutObservableArray<any> = ko.observableArray<any>();
        public contador: KnockoutObservable<number> = ko.observable<number>(0);
        public start: KnockoutObservable<boolean> = ko.observable<boolean>(true);
        public nodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public listNodoReport: KnockoutObservableArray<any> = ko.observableArray<any>();
        public idReporte: KnockoutObservable<any> = ko.observable<any>(0);
        public idNodo: KnockoutObservable<any> = ko.observable<any>(-1);
        public idSector: KnockoutObservable<any> = ko.observable<any>(-1);
        public fechaReporte: KnockoutObservable<any> = ko.observable<any>();
        public fechaStart: KnockoutObservable<any> = ko.observable<any>(null);
        public fechaEnd: KnockoutObservable<any> = ko.observable<any>(null);
        public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        updateNodoFilter() {
            let nodoFilterIns = $('#selectNodo').dxSelectBox('instance');       //
            nodoFilterIns.option('value', this.idNodo());                       //  Esto pone el valor del filtro en el IDNODO actual
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
                //this.reloadChartBar();
                //this.updateGaugeDia();
                //this.updateGaugeLastLectura();
                //this.updateGaugeDiaPrecio();
                this.updateNodoFilter();

                //let chartHist = $('#chartHist').dxChart('instance'); 
                //let ds = chartHist.option('dataSource')
                //chartHist.option('dataSource', ds);
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        addReporte(): void {
            if (this.fechaReporte() === "" || this.fechaReporte() === null || this.fechaReporte() === undefined) {
                DevExpress.ui.notify("No se puede guardar reporte, falta fecha.", "error", 3000);
                return;
            }
            if (this.fechaStart() === "" || this.fechaStart() === null || this.fechaStart() === undefined) {
                DevExpress.ui.notify("No se puede crear reporte, falta fecha de inicio.", "error", 3000);
                return;
            }
            if (this.fechaEnd() === "" || this.fechaEnd() === null || this.fechaEnd() === undefined) {
                DevExpress.ui.notify("No se puede crear reporte, falta fecha de término.", "error", 3000);
                return;
            }

            let url = 'api/reportes';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    FechaHora: this.fechaReporte(),
                    FechaInicio: new Date(this.fechaStart()).toISOString(),
                    FechaTermino: new Date(this.fechaEnd()).toISOString(),
                    UsuarioLogin: window.localStorage.getItem('user')
                }
            }).done((data: any) => {
                DevExpress.ui.notify("Reporte creado correctamente.", "success", 2000);
                this.idReporte(data.ID);
                this.addNodoReporte();
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        addNodoReporte(): void {
            if (this.idNodo() != -1) {
                this.listNodoReport.push({
                    NodoID: this.idNodo()
                })
            } else {
                for (var i: number = 0; i < this.nodos().length; i++) {
                    if (this.nodos()[i].ID != -1) {
                        this.listNodoReport.push({
                            NodoID: this.nodos()[i].ID
                        })
                    }
                }
            }
            let info = JSON.stringify(this.listNodoReport());
            let url = 'api/reportes/nodoReporte';
            $.ajax({
                type: 'POST',
                url: url,
                data: { listNodoReportDTO: this.listNodoReport(), ID: this.idReporte() }
            }).done((data: any) => {
                DevExpress.ui.notify("Reporte creado correctamente.", "success", 2000);
                this.listNodoReport([]);
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
        }

        public customStore = new DevExpress.data.CustomStore({
            load: (loadOptions: any) => {
                var defer = $.Deferred();
                $.getJSON(window.location.origin + '/api/nodos/lectura/' + window.localStorage.getItem('user') + '/' + this.idSector() + '/' + this.idNodo()).done((data) => {
                    //let dateactual = new Date();
                    //let dateayer = new Date();
                    //dateayer.setDate(dateayer.getDate() - 1);
                    //this.lastLectura(0);
                    //this.lastNodo("");
                    //this.lastNodoMax("");
                    //this.lastNodoMin("");
                    let arrayLast: any = [];
                    //let sumKwhDia = 0;
                    //let sumKwhAyer = 0;
                    //this.maxDia(0);
                    //this.minDia(100);
                    for (var i: number = 0; i < data.length; i++) {
                        data[i].FechaHoraJS = new Date(data[i].FechaHora);

                        //if (!this.añoMes().some((e => e.Año === data[i].Año && e.Mes === data[i].Mes))) {
                        //    this.añoMes.push({ Año: data[i].Año, Mes: data[i].Mes });
                        //    var xd = this.añoMes();
                        //    if (!this.years().some(e => e.Año === data[i].Año)) {
                        //        this.years.push({ Año: data[i].Año });
                        //    }
                        //}

                        if (data[i].Dia == 24 && data[i].Mes == 3 && data[i].Año == 2019) { //dateactual.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR

                        }

                    }
                    //if (this.yearSelect() == 0) {
                    //    this.yearSelect(data[i - 1].Año);
                    //    //this.updateAñoFilter();
                    //}

                    if (this.contador() == 0) {
                        //this.updateMesFilter();
                        //this.updateChartYear();
                        //this.updateChartMonth();
                        //this.updateGridLectura();
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

        nodoFilter: any = {
            dataSource: this.nodos,
            width: "auto",
            placeholder: "Seleccione nodo a visualizar...",
            displayExpr: 'Nombre',
            valueExpr: 'ID',
            value: this.idNodo(),
            onItemClick: (e) => {
                this.idNodo(e.itemData.ID);
                this.updateGridLectura();
                //this.reloadChartBar();
                //this.updateGaugeDia();
                //let mas = this.mes(); //Hacer un SELECTBOX CON YEAR, luego al click, guardar el year en un observable, y despues un selectbox con seleccionar Mes, al hacer click, pasar el valor al filter y el year observable.
                //let year = this.year();
                //chartHist.option('dataSource', new DevExpress.data.DataSource({ //ME SERVIRÁ PARA PODER HACER UN FILTRO SELECCIONANDO UN MES Y CAMBIAR EL MES DE LOS GRAFICOS filter: [['Mes', '=', '3']]
                //    store: this.customStore,
                //    filter: [['Mes', '=', mas], "and", ['Año', '=', year]]
                //}));
            }
        }

        sectFilter: any = {
            dataSource: this.sectores,
            width: "auto",
            placeholder: "Seleccione sector de nodos...",
            displayExpr: 'Nombre',
            valueExpr: 'ID',
            value: this.idSector(),
            onItemClick: (e) => {
                this.idSector(e.itemData.ID);
                this.start(false);
                this.getNodosByUser(window.localStorage.getItem('user'), this.idSector());
                //this.reloadChartBar();
            }
        }

        dateStart: any = {
            type: "date",
            pickerType: 'calendar',
            acceptCustomValue: false,
            max: new Date(),
            adaptivityEnabled: true,
            displayFormat: "dd/MM/yyyy",
            onValueChanged: (e) => {
                this.fechaStart(e.value);
                if (this.fechaEnd() != null) {
                    this.updateGridLectura();
                }
            }
        }

        dateEnd: any = {
            type: "date",
            pickerType: 'calendar',
            acceptCustomValue: false,
            max: new Date(),
            adaptivityEnabled: true,
            displayFormat: "dd/MM/yyyy",
            onValueChanged: (e) => {
                this.fechaEnd(e.value);
                if (this.fechaStart() != null) {
                    this.updateGridLectura();
                }
            }
        }

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
                this.fechaReporte(new Date().toISOString());
                this.addReporte();
            },
            onFileSaving: (e) => {
                e.fileName = "lecturas-" + new Date(this.fechaReporte()).toLocaleString();
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
                //let formData: any = $('#form-usuarios').dxForm('option');
                //let usuarioData: any = {
                //    ID: e.data.ID,
                //    Nombre: e.data.Nombre,
                //    Apellido: e.data.Apellido,
                //    User: e.data.User,
                //    Pass: e.data.Pass,
                //    EsAdmin: e.data.EsAdmin
                //}
                ////this.nombreRol(usuarioData.Rol);
                //this.idRow(usuarioData.ID);
                //this.idRowIndex(e.rowIndex);
                //formData.formData = usuarioData;
                //let form = $('#form-usuarios').dxForm('instance');
                //form.repaint();
            }
        };

    }
}