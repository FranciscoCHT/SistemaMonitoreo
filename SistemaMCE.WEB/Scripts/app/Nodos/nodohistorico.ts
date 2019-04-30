/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Nodos {
    'use strict'
    export class NodoHistoricoIndexViewModel {

        public lectura: KnockoutObservableArray<any> = ko.observableArray<any>();
        public years: KnockoutObservableArray<any> = ko.observableArray<any>();
        public añoMes: KnockoutObservableArray<any> = ko.observableArray<any>();
        public yearSelect: KnockoutObservable<number> = ko.observable<number>(0);
        public contador: KnockoutObservable<number> = ko.observable<number>(0);
        public mesSelect: KnockoutObservable<any> = ko.observable<any>("");
        public meses: KnockoutObservableArray<any> = ko.observableArray<any>();
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
            let gaugeLecturaActual = $('#gaugeLecturaActual').dxCircularGauge('instance');        //
            gaugeLecturaActual.option("value", this.lastLectura());                               //  Esto pone el valor del gauge en el valor diario calculado
            gaugeLecturaActual.option('subvalues', [this.minDia(), this.maxDia()]);
        }

        updateAñoFilter() {
            let añoFilterIns = $('#selectAño').dxSelectBox('instance');       
            añoFilterIns.option('value', this.yearSelect());
        }

        updateChartYear() {
            let chartYear = $('#chartYear').dxChart('instance');
            let chartDataSource = chartYear.option('dataSource');  
            chartDataSource.filter(['Año', '=', this.yearSelect()]);
            chartDataSource.load();
            //chartYear.option('dataSource', new DevExpress.data.DataSource({ 
            //    store: this.customStore,
            //    filter: ['Año', '=', this.yearSelect()]
            //}));
        }

        updateChartMonth() {
            let chartMonth = $('#chartMonth').dxChart('instance');
            let chartDataSource = chartMonth.option('dataSource');
            chartDataSource.filter([['Mes', '=', this.mesSelect()], "and", ['Año', '=', this.yearSelect()]]);
            chartDataSource.load();
            //chartMonth.option('dataSource', new DevExpress.data.DataSource({
            //    store: this.customStore,
            //    filter: [['Mes', '=', this.mesSelect()], "and", ['Año', '=', this.yearSelect()]]
            //}));
        }

        updateMesFilter() {
            var mon = new Array(11);
            this.meses([]);
            mon[0] = "Enero"; mon[1] = "Febrero"; mon[2] = "Marzo"; mon[3] = "Abril"; mon[4] = "Mayo"; mon[5] = "Junio";
            mon[6] = "Julio"; mon[7] = "Agosto"; mon[8] = "Septiembre"; mon[9] = "Octubre"; mon[10] = "Noviembre"; mon[11] = "Diciembre";
            this.añoMes().forEach((item, x) => {
                if (item.Año == this.yearSelect()) {
                    this.meses.push({ Mes: item.Mes, MesStr: mon[item.Mes-1] });
                    this.mesSelect(item.Mes);
                }
            });
            let mesFilterIns = $('#selectMes').dxSelectBox('instance');       
            mesFilterIns.option('value', this.mesSelect())
            //this.updateChartMonth();
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
                //this.reloadChartLastWeek();
                this.updateChartYear();
                this.updateChartMonth();
                this.updateGaugeDia();
                this.updateGaugeLastLectura();
                this.updateNodoFilter();
                //let chartYear = $('#chartYear').dxChart('instance'); 
                //let ds = chartYear.option('dataSource')
                //chartYear.option('dataSource', ds);
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
                    let dateayer = new Date();
                    dateayer.setDate(dateayer.getDate() - 1);
                    this.lastLectura(0);
                    this.lastNodo("");
                    //this.lastNodoMax("");
                    //this.lastNodoMin("");
                    let arrayLast: any = [];
                    let sumKwhDia = 0;
                    let sumKwhAyer = 0;
                    this.maxDia(0);
                    this.minDia(100);
                    for (var i: number = 0; i < data.length; i++) {
                        data[i].FechaHoraJS = new Date(data[i].FechaHora);

                        if (!this.añoMes().some((e => e.Año === data[i].Año && e.Mes === data[i].Mes))) {
                            this.añoMes.push({ Año: data[i].Año, Mes: data[i].Mes });
                            var xd = this.añoMes();
                            if (!this.years().some(e => e.Año === data[i].Año)) {
                                this.years.push({ Año: data[i].Año });
                            }
                        }

                        if (data[i].Dia == 24 && data[i].Mes == 3 && data[i].Año == 2019) { //dateactual.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
                            sumKwhDia = sumKwhDia + data[i].Kwh
                            //if (data[i].Kwh > this.maxDia()) {
                            //    this.maxDia(data[i].Kwh);
                            //    this.lastNodoMax(data[i].Nodo.Nombre);
                            //}
                            //if (data[i].Kwh < this.minDia()) {
                            //    this.minDia(data[i].Kwh);
                            //    this.lastNodoMin(data[i].Nodo.Nombre);
                            //}

                            //if (arrayLast.some(e => e.ID === data[i].Nodo.ID)) {                        // Este if buscara todos los ultimas lecturas de los nodos correspondientes y lo guardara en un array.
                            //    arrayLast.forEach((item, x) => {                                        //
                            //        if (item.ID == data[i].Nodo.ID)                                     //
                            //            arrayLast[x] = { ID: data[i].Nodo.ID, Lectura: data[i].Kwh };   //
                            //    });                                                                     //
                            //} else {                                                                    //
                            //    arrayLast.push({ ID: data[i].Nodo.ID, Lectura: data[i].Kwh });          //
                            //}                                                                           //

                            if (this.idNodo() != -1) {
                                this.lastNodo(data[i].Nodo.Nombre);
                            } else {
                                this.lastNodo("Todos");
                            }
                        }

                        if (data[i].Dia == 23 && data[i].Mes == 3 && data[i].Año == 2019) {         //dateactual.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
                            sumKwhAyer = sumKwhAyer + data[i].Kwh                                   // Suma de los valores Kwh dia anterior
                        }
                        //data[i].FechaHoraUTC = Date.parse(data[i].FechaHoraUTC);                  // Esto para filtrar con date en milisegundos. Es con UTC ya que el date parse solo se puede con UTC String
                        //let dateString = new Date(data[i].FechaHora).toString().split(" GMT");
                        //data[i].FechaHoraString = dateString[0].slice(0, -3);
                    }
                    if (this.yearSelect() == 0) {
                        this.yearSelect(data[i - 1].Año);
                        this.updateAñoFilter();
                    }
                    
                    if (this.contador() == 0) {
                        this.updateMesFilter();
                        this.updateChartYear();
                        this.updateChartMonth();
                        this.contador(1);
                    }
                    //this.updateChartMonth();
                    //arrayLast.forEach((item) => {
                    //    let temp = this.lastLectura();
                    //    this.lastLectura(temp + item.Lectura);
                    //});
                    //this.kwhDia(Math.round(sumKwhDia * 1e12) / 1e12);
                    //this.kwhDiaAyer(Math.round(sumKwhAyer * 1e12) / 1e12);
                    //this.avgDia((Math.round(sumKwhDia * 1e12) / 1e12) / data.length);
                    //this.updateGaugeDia();
                    //this.updateGaugeLastLectura();
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
                this.updateChartYear();
                this.updateChartMonth();
                this.updateGaugeDia();
                //let mas = this.mes(); //Hacer un SELECTBOX CON YEAR, luego al click, guardar el year en un observable, y despues un selectbox con seleccionar Mes, al hacer click, pasar el valor al filter y el year observable.
                //let year = this.year();
                //chartYear.option('dataSource', new DevExpress.data.DataSource({ //ME SERVIRÁ PARA PODER HACER UN FILTRO SELECCIONANDO UN MES Y CAMBIAR EL MES DE LOS GRAFICOS filter: [['Mes', '=', '3']]
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

        mesFilter: any = {
            dataSource: this.meses,
            width: "auto",
            placeholder: "Seleccione mes...",
            displayExpr: 'MesStr',
            valueExpr: 'Mes',
            value: this.mesSelect(),
            onItemClick: (e) => {
                this.mesSelect(e.itemData.Mes);
                this.updateChartMonth();
                //this.idSector(e.itemData.ID);
                //this.getNodosByUser(window.localStorage.getItem('user'), e.itemData.Año);
                //this.reloadChartLastWeek();
            }
        }

        añoFilter: any = {
            dataSource: this.years,
            width: "auto",
            placeholder: "Seleccione año...",
            displayExpr: 'Año',
            valueExpr: 'Año',
            value: this.yearSelect(),
            onItemClick: (e) => {
                this.yearSelect(e.itemData.Año);
                this.updateMesFilter();
                this.updateChartMonth();
                this.updateChartYear();
                //this.reloadChartLastWeek();
            }
        }

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
                minorTickInterval: 0.01,
                label: {
                    indentFromTick: 3
                }
            },
            rangeContainer: {
                offset: 15,
                width: 10,
                ranges: [
                    { startValue: 0, endValue: 0.15, color: "#77DD77" },
                    { startValue: 0.15, endValue: 0.3, color: "#E6E200" },
                    { startValue: 0.3, endValue: 0.5, color: "#ff0000" }
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
                    //if (scaleValue.value == this.maxDia()) {
                    //    return { text: "Nodo: " + this.lastNodoMax() + "<br/>" + "Valor Kwh: " + scaleValue.value }
                    //}
                    //else if (scaleValue.value == this.minDia()) {
                    //    return { text: "Nodo: " + this.lastNodoMin() + "<br/>" + "Valor Kwh: " + scaleValue.value }
                    //}
                    //else {
                        return { text: "Nodo: " + this.lastNodo() + "<br/>" + "Valor Kwh: " + scaleValue.value }
                    //}
                }
            },
            value: this.lastLectura(),
            //subvalues: [40, 90] //https://www.iea.org/statistics/?country=CHILE&year=2016&category=Energy%20consumption&indicator=ElecConsPerCapita&mode=chart&dataTable=INDICATORS
        }

        chartYear: any = {
            palette: "Dark Violet",
            dataSource: new DevExpress.data.DataSource({
                store: this.customStore,                                // v Esto para filtrar con date en milisegundos. v
                filter: [['Año', '=', this.yearSelect()]]     //['FechaHoraUTC', '<=', Date.parse(new Date().toUTCString())], "and", ['FechaHoraUTC', '>=', Date.parse(new Date().toUTCString()) - 86400000*21]
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
                aggregationInterval: "month",
                grid: {
                    visible: true
                },
                label: {
                    overlappingBehavior: "rotate",
                    rotationAngle: "-60",
                    format: (FechaHora) => {
                        var month = new Array(12);
                        month[0] = "Enero";
                        month[1] = "Febrero";
                        month[2] = "Marzo";
                        month[3] = "Abril";
                        month[4] = "Mayo";
                        month[5] = "Junio";
                        month[6] = "Julio";
                        month[7] = "Agosto";
                        month[8] = "Septiembre";
                        month[9] = "Octubre";
                        month[10] = "Noviembre";
                        month[11] = "Diciembre";
                        return month[FechaHora.getMonth()];
                    }
                },
                tickInterval: 'month'
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
                text: "Consumo del año<br/>seleccionado",
                subtitle: { text: "(KwH, por mes)", font: { size: 12, opacity: 0.8 } },
                font: { size: 18 }
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

        chartMonth: any = {
            palette: "Dark Violet",
            dataSource: new DevExpress.data.DataSource({
                store: this.customStore,                                // v Esto para filtrar con date en milisegundos. v
                filter: [['Mes', '=', this.mesSelect()], "and", ['Año', '=', this.yearSelect()]]     //['FechaHoraUTC', '<=', Date.parse(new Date().toUTCString())], "and", ['FechaHoraUTC', '>=', Date.parse(new Date().toUTCString()) - 86400000*21]
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
                    //format: (FechaHora) => {
                    //    var month = new Array(12);
                    //    month[0] = "Enero";
                    //    month[1] = "Febrero";
                    //    month[2] = "Marzo";
                    //    month[3] = "Abril";
                    //    month[4] = "Mayo";
                    //    month[5] = "Junio";
                    //    month[6] = "Julio";
                    //    month[7] = "Agosto";
                    //    month[8] = "Septiembre";
                    //    month[9] = "Octubre";
                    //    month[10] = "Noviembre";
                    //    month[11] = "Diciembre";
                    //    return month[FechaHora.getMonth()];
                    //}
                },
                tickInterval: 'day'
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
                text: "Consumo del mes<br/>seleccionado",
                subtitle: { text: "(KwH, por día)", font: { size: 12, opacity: 0.8 } },
                font: { size: 18 }
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