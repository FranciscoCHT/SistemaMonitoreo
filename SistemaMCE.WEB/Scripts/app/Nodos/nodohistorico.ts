/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Nodos {
    'use strict'
    export class NodoHistoricoIndexViewModel {

        //public lectura: KnockoutObservableArray<any> = ko.observableArray<any>();
        //public nodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        //public idNodo: KnockoutObservable<any> = ko.observable<any>(-1);
        //public tipoNodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        //public nombreTipo: KnockoutObservable<any> = ko.observable<any>();
        //public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();
        //public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        //public enable: KnockoutObservable<boolean> = ko.observable(true);
        //public idRow: KnockoutObservable<number> = ko.observable(0);
        //public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        //getNodosByUser(user: any): void {
        //    this.nodos([]);
        //    let url = window.location.origin + '/api/nodos/' + user;
        //    $.ajax({
        //        type: 'GET',
        //        url: url,
        //    }).done((data: any) => {
        //        for (var i: number = 0; i < data.length; i++) {
        //            this.nodos.push({
        //                ID: data[i].ID,
        //                Nombre: data[i].Nombre,
        //                Tipo: data[i].Tipo,
        //                TipoStr: data[i].TipoStr,
        //                Estado: data[i].Estado,
        //                Voltaje: data[i].Voltaje,
        //                Sector: data[i].Sector,
        //                Usuario: data[i].Usuario
        //            });
        //        }
        //        this.idNodo(data[1].ID);
        //        this.dataSource.filter(["ID", "<", 50]);
        //        //this.dataSource.load;
        //        let chartHist = $('#chartHist').dxChart('instance');
        //        let ds = chartHist.option('dataSource')
        //        chartHist.option('dataSource', ds);
        //    }).fail((data: any) => {
        //        DevExpress.ui.notify(data.responseJSON, "error", 3000);
        //    });
        //}

        //constructor() {
        //    this.getNodosByUser(window.localStorage.getItem('user'));
        //}

        //public store = new DevExpress.data.CustomStore({
        //    load: (loadOptions: any) => {
        //        var defer = $.Deferred();
        //        $.getJSON(window.location.origin + '/api/nodos/lectura/' + this.idNodo()).done(function (data) {

        //            // Perform filtering on client side
        //            var query = DevExpress.data.query(data);
        //            if (loadOptions.filter) {
        //                query = query.filter(loadOptions.filter);
        //            }
        //            defer.resolve(query.toArray());
        //        });
        //        return defer.promise();
        //    }
        //});

        //public dataSource = new DevExpress.data.DataSource({
        //    store: this.store
        //})
    
        //chartHist: any = {
        //    palette: "Violet",
        //    dataSource: this.dataSource,
        //    commonSeriesSettings: {
        //        argumentField: "FechaHora"
        //    },
        //    margin: {
        //        bottom: 20
        //    },
        //    argumentAxis: {
        //        valueMarginsEnabled: false,
        //        discreteAxisDivisionMode: "crossLabels",
        //        grid: {
        //            visible: true
        //        }
        //    },
        //    series: [
        //        { valueField: "Kwh", name: "Kwh" }
        //    ],
        //    legend: {
        //        verticalAlignment: "bottom",
        //        horizontalAlignment: "center",
        //        itemTextPosition: "bottom"
        //    },
        //    title: {
        //        text: "Energy Consumption in 2004",
        //        subtitle: {
        //            text: "(Millions of Tons, Oil Equivalent)"
        //        }
        //    },
        //    "export": {
        //        enabled: true
        //    },
        //    tooltip: {
        //        enabled: true,
        //        customizeTooltip: function (arg) {
        //            return {
        //                text: arg.valueText
        //            };
        //        }
        //    }
        //    //dataSource: [
        //    //    {
        //    //        "arg": "Monday",
        //    //        "val": 3
        //    //    },
        //    //    {
        //    //        "arg": "Tuesday",
        //    //        "val": 2
        //    //    },
        //    //    {
        //    //        "arg": "Wednesday",
        //    //        "val": 3
        //    //    },
        //    //    {
        //    //        "arg": "Thursday",
        //    //        "val": 4
        //    //    },
        //    //    {
        //    //        "arg": "Friday",
        //    //        "val": 6
        //    //    },
        //    //    {
        //    //        "arg": "Saturday",
        //    //        "val": 11
        //    //    },
        //    //    {
        //    //        "arg": "Sunday",
        //    //        "val": 4
        //    //    }
        //    //],
        //    //series: {}
        //}

        public lectura: KnockoutObservableArray<any> = ko.observableArray<any>();
        public kwhDia: KnockoutObservable<number> = ko.observable<number>(0);
        public maxDia: KnockoutObservable<number> = ko.observable<number>(0);
        public minDia: KnockoutObservable<number> = ko.observable<number>(0);
        public avgDia: KnockoutObservable<number> = ko.observable<number>(0);
        public lastLectura: KnockoutObservable<number> = ko.observable<number>(0);
        public lastNodo: KnockoutObservable<any> = ko.observable<any>();
        public nodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public idNodo: KnockoutObservable<any> = ko.observable<any>(-1);
        public idSector: KnockoutObservable<any> = ko.observable<any>(-1);
        public tipoNodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public nombreTipo: KnockoutObservable<any> = ko.observable<any>();
        public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        //addDays(date, days) {
        //    return new Date(
        //        date.getFullYear(),
        //        date.getMonth(),
        //        date.getDate() + days,
        //        date.getHours(),
        //        date.getMinutes(),
        //        date.getSeconds(),
        //        date.getMilliseconds()
        //    );
        //}

        //UNA MANERA DE HACERLO ES SACAR EL DATENOW POR JAVASCRIPT Y LUEGO SACAR EL GETDAY GETMONTH GETYEAR, PARA ASI DATASOURCE FILTER POR DAY = GETDAY MONTH=GETMONTH... ETC, SI NO, LLAMADA AJAX A UN METODO API CON PARAMETROS DIA MES Y AÑO

        getLastWeek() {
            var today = new Date();
            today.setDate(today.getDate() - 40);
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return lastWeek;
        }

        reloadChartLastWeek() {
            let chartHist = $('#chartHist').dxChart('instance');            //
            let chartDataSource = chartHist.option('dataSource');           //  Esto recarga el datasource, lo que hace que se consulte de nuevo la lectura, con el nuevo IDNODO
            chartDataSource.load();                                         //
        }

        updateNodoFilter() {
            let nodoFilterIns = $('#selectNodo').dxSelectBox('instance');       //
            nodoFilterIns.option('value', this.idNodo());                       //  Esto pone el valor del filtro en el IDNODO actual
        }

        updateGaugeDia() {
            let gaugeDiaActual = $('#gaugeDiaActual').dxCircularGauge('instance');       //
            gaugeDiaActual.option("value", this.kwhDia());                               //  Esto pone el valor del gauge en el valor diario calculado
            if (this.idNodo() == -1) {
                gaugeDiaActual.option('scale.endValue', 20);
                gaugeDiaActual.option('scale.tickInterval', 5);
                gaugeDiaActual.option('scale.minorTickInterval', 1);
                //gaugeDiaActual.option('subvalues', [this.minDia(), this.maxDia()]);
            } else {
                gaugeDiaActual.option('scale.endValue', 10);
                gaugeDiaActual.option('scale.tickInterval', 1);
                gaugeDiaActual.option('scale.minorTickInterval', 0.1);
                //gaugeDiaActual.option('subvalues', [this.minDia(), this.maxDia()]);
            }
        }

        updateGaugeLastLectura() {
            let gaugeLecturaActual = $('#gaugeLecturaActual').dxCircularGauge('instance');       //
            gaugeLecturaActual.option("value", this.lastLectura());                               //  Esto pone el valor del gauge en el valor diario calculado
            gaugeLecturaActual.option('subvalues', [this.minDia(), this.maxDia()]);
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
                this.reloadChartLastWeek();
                this.updateGaugeDia();
                this.updateGaugeLastLectura();
                this.updateNodoFilter();
                //let chartHist = $('#chartHist').dxChart('instance'); 
                //let ds = chartHist.option('dataSource')
                //chartHist.option('dataSource', ds);
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
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
            this.getNodosByUser(window.localStorage.getItem('user'), -1);
            this.getSectores();
        }

        public customStore = new DevExpress.data.CustomStore({
            load: (loadOptions: any) => {
                var defer = $.Deferred();
                $.getJSON(window.location.origin + '/api/nodos/lectura/' + window.localStorage.getItem('user') + '/' + this.idSector() + '/' + this.idNodo()).done((data) => {
                    let dateactual = new Date();
                    this.lastLectura(0);
                    let sumKwhDia = 0;
                    let maxDia = 0;
                    let minDia = 100;
                    for (var i: number = 0; i < data.length; i++) {
                        data[i].FechaHoraJS = new Date(data[i].FechaHora);
                        if (data[i].Dia == 24 && data[i].Mes == 3 && data[i].Año == 2019) { //dateactual.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
                            sumKwhDia = sumKwhDia + data[i].Kwh
                            if (data[i].Kwh > maxDia) {
                                maxDia = data[i].Kwh;
                            }
                            if (data[i].Kwh < minDia) {
                                minDia = data[i].Kwh;
                            }
                            this.lastLectura(data[i].Kwh);
                            this.lastNodo(data[i].Nodo.Nombre);
                        }
                        //data[i].FechaHoraUTC = Date.parse(data[i].FechaHoraUTC);                  // Esto para filtrar con date en milisegundos. Es con UTC ya que el date parse solo se puede con UTC String
                        //let dateString = new Date(data[i].FechaHora).toString().split(" GMT");
                        //data[i].FechaHoraString = dateString[0].slice(0, -3);
                    }
                    this.kwhDia(Math.round(sumKwhDia * 1e12) / 1e12);
                    this.avgDia((Math.round(sumKwhDia * 1e12) / 1e12) / data.length);
                    this.maxDia(maxDia);
                    this.minDia(minDia);
                    //this.lastLectura(data[i-1].Kwh);
                    this.updateGaugeDia();
                    this.updateGaugeLastLectura();
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
                this.reloadChartLastWeek();
                this.updateGaugeDia();
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
                this.getNodosByUser(window.localStorage.getItem('user'), this.idSector());
                //this.reloadChartLastWeek();
            }
        }

        box: any = {
            direction: "row",
            width: "100%",
            height: 75
        };

        gaugeDiaActual: any = {
            //size: { width: "600" },
            scale: {
                startValue: 0, endValue: 20,
                tick: {
                    color: "#536878"
                },
                minorTick: {
                    color: "#9c9c9c",
                    visible: true
                },
                tickInterval: 5,
                label: {
                    indentFromTick: 3
                }
            },
            rangeContainer: {
                offset: 15,
                width: 10,
                ranges: [
                    { startValue: 0, endValue: 10, color: "#77DD77" },
                    { startValue: 10, endValue: 15, color: "#E6E200" },
                    { startValue: 15, endValue: 20, color: "#ff0000" }
                ]
            },
            valueIndicator: {
                offset: 10,
                type: "TriangleNeedle"
            },
            subvalueIndicator: {
                offset: -25
            },
            title: {
                text: "Consumo actual en el día<br>(KwH en el día)",
                font: { size: 18 }
            },
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                customizeTooltip: (scaleValue) => {
                    return {
                        text: "Nodo: " + this.lastNodo() + "<br/>" + "Valor Kwh: " + scaleValue.value
                    }
                }
            },
            value: this.kwhDia(),
            //subvalues: [40, 90] //https://www.iea.org/statistics/?country=CHILE&year=2016&category=Energy%20consumption&indicator=ElecConsPerCapita&mode=chart&dataTable=INDICATORS
        }

        gaugeLecturaActual: any = {
            //size: { width: '600' },
            scale: {
                startValue: 0, endValue: 0.35, //0 - 0.3    CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
                tick: {
                    color: "#536878"
                },
                minorTick: {
                    color: "#9c9c9c",
                    visible: true
                },
                tickInterval: 0.05,
                label: {
                    indentFromTick: 3
                }
            },
            rangeContainer: {
                offset: 15,
                width: 10,
                ranges: [
                    { startValue: 0, endValue: 0.1, color: "#77DD77" },
                    { startValue: 0.1, endValue: 0.2, color: "#E6E200" },
                    { startValue: 0.2, endValue: 0.35, color: "#ff0000" }
                ]
            },
            valueIndicator: {
                offset: 10,
                type: "TriangleNeedle"
            },
            subvalueIndicator: {
                offset: -25
            },
            title: {
                text: "Última lectura por nodo<br>(KwH ultima lectura)",
                subtitle: { text: "Con indicadores de lectura mín y<br>máx del nodo selecionado (del día).", font: { size: 12, opacity: 0.8 } },
                font: { size: 18 }
            },
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                customizeTooltip: (scaleValue) => {
                    return {
                        text: "Nodo: " + this.lastNodo() + "<br/>" + "Valor Kwh: " + scaleValue.value
                    }
                }
            },
            value: this.lastLectura(),
            //subvalues: [40, 90] //https://www.iea.org/statistics/?country=CHILE&year=2016&category=Energy%20consumption&indicator=ElecConsPerCapita&mode=chart&dataTable=INDICATORS
        }

        chartHist: any = {
            palette: "Dark Violet",
            dataSource: new DevExpress.data.DataSource({
                store: this.customStore,                                // v Esto para filtrar con date en milisegundos. v
                filter: [['FechaHoraJS', '>=', this.getLastWeek()]]     //['FechaHoraUTC', '<=', Date.parse(new Date().toUTCString())], "and", ['FechaHoraUTC', '>=', Date.parse(new Date().toUTCString()) - 86400000*21]
            }),
            commonSeriesSettings: {
                argumentField: "FechaHora"
            },
            margin: {
                bottom: 20
            },
            argumentAxis: {
                discreteAxisDivisionMode: "crossLabels",
                argumentType: "datetime",
                aggregationInterval: "day",
                grid: {
                    visible: true
                },
                label: {
                    overlappingBehavior: "rotate",
                    rotationAngle: "-60",
                    format: (FechaHora) => {
                        var weekday = new Array(7);
                        weekday[0] = "Domingo";
                        weekday[1] = "Lunes";
                        weekday[2] = "Martes";
                        weekday[3] = "Miercoles";
                        weekday[4] = "Jueves";
                        weekday[5] = "Viernes";
                        weekday[6] = "Sabado";
                        return weekday[FechaHora.getDay()];
                    }
                },
                tickInterval: { days: 1 }
            },
            series: [
                {
                    axis: "Kwh",
                    color: "#e91e63",
                    valueField: "Kwh",
                    point: {
                        size: 7
                    },
                    type: "bar",
                    aggregation: {
                        enabled: true,
                        method: "sum"
                    },
                    name: "Kilowatt por Hora"
                }
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: "bottom"
            },
            title: {
                text: "Consumo eléctrico esta semana",
                subtitle: {
                    text: "(Kilowatt por hora, día equivalente)"
                }
            },
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                customizeTooltip: (arg) => {
                    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric" };
                    let slice = arg.argument.toLocaleString("es-ES", options).slice(0, -2);
                    return {
                        text: "Fecha: " + slice + "<br/>" + "KwH: " + Math.round(arg.value * 1e12) / 1e12
                    }
                }
            }
        }
    }
}