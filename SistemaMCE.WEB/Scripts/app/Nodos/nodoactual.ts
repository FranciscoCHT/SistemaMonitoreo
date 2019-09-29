/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Nodos {
    'use strict'
    export class NodoActualIndexViewModel {

        public lectura: KnockoutObservableArray<any> = ko.observableArray<any>();
        public kwhDia: KnockoutObservable<number> = ko.observable<number>(0);
        public precioDia: KnockoutObservable<number> = ko.observable<number>(0);
        public kwhDiaAyer: KnockoutObservable<number> = ko.observable<number>(0);
        public precioDiaAyer: KnockoutObservable<number> = ko.observable<number>(0);
        public maxDia: KnockoutObservable<number> = ko.observable<number>(0);
        public minDia: KnockoutObservable<number> = ko.observable<number>(0);
        public avgDia: KnockoutObservable<number> = ko.observable<number>(0);
        public contadorMax: KnockoutObservable<number> = ko.observable<number>(0);
        public contadorMin: KnockoutObservable<number> = ko.observable<number>(0);
        public lastLectura: KnockoutObservable<number> = ko.observable<number>(0);
        public lastNodo: KnockoutObservable<any> = ko.observable<any>();
        public lastNodoMax: KnockoutObservable<any> = ko.observable<any>();
        public lastNodoMin: KnockoutObservable<any> = ko.observable<any>();
        public nodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public idNodo: KnockoutObservable<any> = ko.observable<any>(-1);
        public idSector: KnockoutObservable<any> = ko.observable<any>(-1);
        public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        getLastWeek() {
            var today = new Date();
            today.setDate(today.getDate() - 30);
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return lastWeek;
        }

        getLastMonth() {
            var today = new Date();
            today.setDate(today.getDate() - 40);
            var lastMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return lastMonth;
        }

        reloadChartBar() {
            let chartHist = $('#chartHist').dxChart('instance');            //
            let chartDataSource = chartHist.option('dataSource');           //  Esto recarga el datasource, lo que hace que se consulte de nuevo la lectura, con el nuevo IDNODO
            chartDataSource.load();                                         //

            let chartMonth = $('#chartMonth').dxChart('instance');            //
            chartDataSource = chartMonth.option('dataSource');           //  Esto recarga el datasource, lo que hace que se consulte de nuevo la lectura, con el nuevo IDNODO
            chartDataSource.load(); 

            let chartWeekPrecio = $('#chartWeekPrecio').dxChart('instance');            //
            chartDataSource = chartWeekPrecio.option('dataSource');           //  Esto recarga el datasource, lo que hace que se consulte de nuevo la lectura, con el nuevo IDNODO
            chartDataSource.load(); 

            let chartMonthPrecio = $('#chartMonthPrecio').dxChart('instance');            //
            chartDataSource = chartMonthPrecio.option('dataSource');           //  Esto recarga el datasource, lo que hace que se consulte de nuevo la lectura, con el nuevo IDNODO
            chartDataSource.load(); 
        }

        updateNodoFilter() {
            let nodoFilterIns = $('#selectNodo').dxSelectBox('instance');       //
            nodoFilterIns.option('value', this.idNodo());                       //  Esto pone el valor del filtro en el IDNODO actual
        }

        updateGaugeDia() {
            let gaugeDiaActual = $('#gaugeDiaActual').dxCircularGauge('instance');       //
            gaugeDiaActual.option("value", this.kwhDia());                               //  Esto pone el valor del gauge en el valor diario calculado
            gaugeDiaActual.option('subvalues', [this.kwhDiaAyer()]);                     //  Esto pone el subvalor del gauge en el valor total del dia anterior calculado
            if (this.idNodo() == -1) {
                gaugeDiaActual.option('scale.endValue', 20);
                gaugeDiaActual.option('scale.tickInterval', 5);
                gaugeDiaActual.option('scale.minorTickInterval', 1);
                //gaugeDiaActual.option('subvalues', [this.minDia(), this.maxDia()]);
            } else {
                gaugeDiaActual.option('scale.endValue', 20);
                gaugeDiaActual.option('scale.tickInterval', 5);
                gaugeDiaActual.option('scale.minorTickInterval', 1);
                //gaugeDiaActual.option('subvalues', [this.minDia(), this.maxDia()]);
            }
        }

        updateGaugeLastLectura() {
            let gaugeLecturaActual = $('#gaugeLecturaActual').dxCircularGauge('instance');        //
            gaugeLecturaActual.option("value", this.lastLectura());                               //  Esto pone el valor del gauge en el valor diario calculado
            gaugeLecturaActual.option('subvalues', [this.minDia(), this.maxDia()]);
            if (this.idNodo() == -1) {
                gaugeLecturaActual.option('scale.endValue', 0.5);
            } else {
                gaugeLecturaActual.option('scale.endValue', 0.1);
            }
        }

        updateGaugeDiaPrecio() {
            let gaugeDiaPrecio = $('#gaugeDiaPrecio').dxCircularGauge('instance');        //
            gaugeDiaPrecio.option("value", this.precioDia());                               //  Esto pone el valor del gauge en el valor diario calculado
            gaugeDiaPrecio.option('subvalues', [this.precioDiaAyer()]);
            if (this.idNodo() == -1) {
                gaugeDiaPrecio.option('scale.endValue', 1500);
            } else {
                gaugeDiaPrecio.option('scale.endValue', 800);
            }
        }

        // PODRÍA INCLUIR UN SWITCH QUE AL PONERLO EN ON LOS VALORES MIN Y MAX DE LOS GAUGES (CAMBIANDOLE EL VALUE POR INSTANCE) SE ADAPTEN DE ACUERDO A UN PROMEDIO DE SU CONSUMO HISTORICO (PROMEDIO DE LOS MAX VALUES - PROMEDIO DE LOS MIN VALUES) Y AL PONER OFF SE PONGAN LOS VALORES DEFECTOS DE CHILE.

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
                this.getCustomStore();
                this.reloadChartBar();
                this.updateGaugeDia();
                this.updateGaugeLastLectura();
                this.updateGaugeDiaPrecio();
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
            if (window.localStorage.getItem('user') === null || window.localStorage.getItem('user') == undefined) {
                window.location.replace(window.location.origin + '/Login');
            }
            this.getNodosByUser(window.localStorage.getItem('user'), -1);
            this.getSectores();

            var btn = document.getElementById("boton");
            btn.addEventListener("click", (e: Event) => this.getCustomStore());
            setInterval(function () { btn.click() }, 10000);
        }

        getCustomStore(): any {
            var defer = $.Deferred();
            $.getJSON(window.location.origin + '/api/nodos/lectura/' + window.localStorage.getItem('user') + '/' + this.idSector() + '/' + this.idNodo()).done((data) => {
                //console.log(data);
                let dateactual = new Date();
                let dateayer = new Date();
                dateayer.setDate(dateayer.getDate() - 1);
                this.lastLectura(0);
                this.lastNodo("");
                this.lastNodoMax("");
                this.lastNodoMin("");
                let arrayLast: any = [];
                let sumKwhDia = 0;
                let sumKwhAyer = 0;
                let sumPrecioDia = 0;
                let sumPrecioAyer = 0;
                this.maxDia(0);
                this.minDia(100);
                for (var i: number = 0; i < data.length; i++) {
                    data[i].FechaHoraJS = new Date(data[i].FechaHora);
                    if (data[i].Dia == dateactual.getDate() && data[i].Mes == dateactual.getMonth()+1 && data[i].Año == dateactual.getFullYear()/*data[i].Dia == 18 && data[i].Mes == 8 && data[i].Año == 2019*/) { //dateactual.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
                        sumKwhDia = sumKwhDia + data[i].Kwh;
                        sumPrecioDia = sumPrecioDia + data[i].Precio;
                        if (data[i].Kwh > this.maxDia()) {
                            this.maxDia(data[i].Kwh);
                            this.lastNodoMax(data[i].Nodo.Nombre);
                        }
                        if (data[i].Kwh < this.minDia()) {
                            this.minDia(data[i].Kwh);
                            this.lastNodoMin(data[i].Nodo.Nombre);
                        }

                        if (arrayLast.some(e => e.ID === data[i].Nodo.ID)) {                        // Este if buscara todos los ultimas lecturas de los nodos correspondientes y lo guardara en un array.
                            arrayLast.forEach((item, x) => {                                        //
                                if (item.ID == data[i].Nodo.ID)                                     //
                                    arrayLast[x] = { ID: data[i].Nodo.ID, Lectura: data[i].Kwh };   //
                            });                                                                     //
                        } else {                                                                    //
                            arrayLast.push({ ID: data[i].Nodo.ID, Lectura: data[i].Kwh });          //
                        }                                                                           //

                        if (this.idNodo() != -1) {
                            this.lastNodo(data[i].Nodo.Nombre);
                        } else {
                            this.lastNodo("Todos");
                        }
                    }

                    if (data[i].Dia == dateayer.getDate() && data[i].Mes == dateayer.getMonth()+1 && data[i].Año == dateayer.getFullYear()/*data[i].Dia == 17 && data[i].Mes == 8 && data[i].Año == 2019*/) {          //dateayer.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
                        sumKwhAyer = sumKwhAyer + data[i].Kwh;                                   // Suma de los valores Kwh dia anterior
                        sumPrecioAyer = sumPrecioAyer + data[i].Precio;
                    }
                    //data[i].FechaHoraUTC = Date.parse(data[i].FechaHoraUTC);                  // Esto para filtrar con date en milisegundos. Es con UTC ya que el date parse solo se puede con UTC String
                    //let dateString = new Date(data[i].FechaHora).toString().split(" GMT");
                    //data[i].FechaHoraString = dateString[0].slice(0, -3);
                }
                arrayLast.forEach((item) => {
                    let temp = this.lastLectura();
                    this.lastLectura(temp + item.Lectura);
                });
                this.kwhDia(Math.round(sumKwhDia * 1e12) / 1e12);
                this.precioDia(Math.round(sumPrecioDia));
                this.kwhDiaAyer(Math.round(sumKwhAyer * 1e12) / 1e12);
                this.precioDiaAyer(Math.round(sumPrecioAyer));
                this.avgDia((Math.round(sumKwhDia * 1e12) / 1e12) / data.length);
                this.updateGaugeDia();
                this.updateGaugeLastLectura();
                this.updateGaugeDiaPrecio();
                this.reloadChartBar();
                // Perform filtering on client side
                var query = DevExpress.data.query(data);
                //if (loadOptions.filter) {
                //    query = query.filter(loadOptions.filter);
                //}
                defer.resolve(query.toArray());
                return data;
            });
            //return defer.promise();
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
                    this.lastNodoMax("");
                    this.lastNodoMin("");
                    let arrayLast: any = [];
                    let sumKwhDia = 0;
                    let sumKwhAyer = 0;
                    let sumPrecioDia = 0;
                    let sumPrecioAyer = 0;
                    this.maxDia(0);
                    this.minDia(100);
                    for (var i: number = 0; i < data.length; i++) {
                        data[i].FechaHoraJS = new Date(data[i].FechaHora);
                        if (data[i].Dia == dateactual.getDate() && data[i].Mes == dateactual.getMonth()+1 && data[i].Año == dateactual.getFullYear()/*data[i].Dia == 18 && data[i].Mes == 8 && data[i].Año == 2019*/) { //dateactual.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
                            sumKwhDia = sumKwhDia + data[i].Kwh;
                            sumPrecioDia = sumPrecioDia + data[i].Precio;
                            if (data[i].Kwh > this.maxDia()) {
                                this.maxDia(data[i].Kwh);
                                this.lastNodoMax(data[i].Nodo.Nombre);
                            }
                            if (data[i].Kwh < this.minDia()) {
                                this.minDia(data[i].Kwh);
                                this.lastNodoMin(data[i].Nodo.Nombre);
                            }

                            if (arrayLast.some(e => e.ID === data[i].Nodo.ID)) {                        // Este if buscara todos los ultimas lecturas de los nodos correspondientes y lo guardara en un array.
                                arrayLast.forEach((item, x) => {                                        //
                                    if (item.ID == data[i].Nodo.ID)                                     //
                                        arrayLast[x] = { ID: data[i].Nodo.ID, Lectura: data[i].Kwh };   //
                                });                                                                     //
                            } else {                                                                    //
                                arrayLast.push({ ID: data[i].Nodo.ID, Lectura: data[i].Kwh });          //
                            }                                                                           //

                            if (this.idNodo() != -1) {
                                this.lastNodo(data[i].Nodo.Nombre);
                            } else {
                                this.lastNodo("Todos");
                            }
                        }

                        if (data[i].Dia == dateayer.getDate() && data[i].Mes == dateayer.getMonth()+1 && data[i].Año == dateayer.getFullYear()/*data[i].Dia == 17 && data[i].Mes == 8 && data[i].Año == 2019*/) {          //dateayer.getDay() CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
                            sumKwhAyer = sumKwhAyer + data[i].Kwh;                                   // Suma de los valores Kwh dia anterior
                            sumPrecioAyer = sumPrecioAyer + data[i].Precio;
                        }
                        //data[i].FechaHoraUTC = Date.parse(data[i].FechaHoraUTC);                  // Esto para filtrar con date en milisegundos. Es con UTC ya que el date parse solo se puede con UTC String
                        //let dateString = new Date(data[i].FechaHora).toString().split(" GMT");
                        //data[i].FechaHoraString = dateString[0].slice(0, -3);
                    }
                    arrayLast.forEach((item) => {
                        let temp = this.lastLectura();
                        this.lastLectura(temp + item.Lectura);
                    });
                    this.kwhDia(Math.round(sumKwhDia * 1e12) / 1e12);
                    this.precioDia(Math.round(sumPrecioDia));
                    this.kwhDiaAyer(Math.round(sumKwhAyer * 1e12) / 1e12);
                    this.precioDiaAyer(Math.round(sumPrecioAyer));
                    this.avgDia((Math.round(sumKwhDia * 1e12) / 1e12) / data.length);
                    this.updateGaugeDia();
                    this.updateGaugeLastLectura();
                    this.updateGaugeDiaPrecio();
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
                this.getCustomStore();
                this.reloadChartBar();
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
                this.getNodosByUser(window.localStorage.getItem('user'), this.idSector());
                //this.reloadChartBar();
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
                    indentFromTick: 3,
                    font: { size: 10 }
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
                text: "Consumo actual en el día",
                subtitle: { text: "(KwH en el día)", font: { size: 10, opacity: 0.8 } },
                font: { size: 14 }
            },
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                customizeTooltip: (scaleValue) => {
                    if (scaleValue.value == this.kwhDiaAyer()) {
                        return { text: "<b>Ayer</b>" + "<br/>" + "Nodo: " + this.lastNodo() + "<br/>" + "Valor Kwh: " + scaleValue.value }
                    }
                    else {
                        return { text: "<b>Hoy</b>" + "<br/>" + "Nodo: " + this.lastNodo() + "<br/>" + "Valor Kwh: " + scaleValue.value }
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
                tickInterval: 0.02,
                minorTickInterval: 0.01,
                label: {
                    indentFromTick: 3,
                    font: { size: 14 }
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
                subtitle: { text: "Con indicadores de lectura mín y<br>máx del nodo selecionado (del día).", font: { size: 10, opacity: 0.8 }},
                font: { size: 14 }
            },
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                customizeTooltip: (scaleValue) => {
                    if (scaleValue.value == this.maxDia() && this.contadorMax() == 0) {
                        this.contadorMax(1);
                        return { text: "<b>Valor Max</b><br/>" + "Nodo: " + this.lastNodoMax() + "<br/>" + "Valor Kwh: " + scaleValue.value }
                    }
                    else if (scaleValue.value == this.minDia() && this.contadorMin() == 0) {
                        this.contadorMin(1);
                        return { text: "<b>Valor Min</b><br/>" + "Nodo: " + this.lastNodoMin() + "<br/>" + "Valor Kwh: " + scaleValue.value }
                    }
                    else {
                        return { text: "<b>Valor Actual</b><br/>" + "Nodo: " + this.lastNodo() + "<br/>" + "Valor Kwh: " + scaleValue.value }
                    }
                }
            },
            value: this.lastLectura(),
            //subvalues: [40, 90] //https://www.iea.org/statistics/?country=CHILE&year=2016&category=Energy%20consumption&indicator=ElecConsPerCapita&mode=chart&dataTable=INDICATORS
        }

        gaugeDiaPrecio: any = {
            //size: { width: '600' },
            scale: {
                startValue: 0, endValue: 1500,
                tick: {
                    color: "#536878"
                },
                minorTick: {
                    color: "#9c9c9c",
                    visible: true
                },
                tickInterval: 100,
                minorTickInterval: 20,
                label: {
                    indentFromTick: 3,
                    font: { size: 10 }
                }
            },
            rangeContainer: {
                offset: 15,
                width: 10,
                ranges: [
                    { startValue: 0, endValue: 800, color: "#77DD77" },
                    { startValue: 800, endValue: 1300, color: "#E6E200" },
                    { startValue: 1300, endValue: 1500, color: "#ff0000" }
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
                text: "Precio Actual en el día",
                subtitle: { text: "($ en el día)", font: { size: 10, opacity: 0.8 } },
                font: { size: 14 }
            },
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                customizeTooltip: (scaleValue) => {
                    if (scaleValue.value == this.precioDiaAyer()) {
                        return { text: "<b>Ayer</b>" + "<br/>" + "Nodo: " + this.lastNodo() + "<br/>" + "Precio: " + scaleValue.value }
                    }
                    else {
                        return { text: "<b>Hoy</b>" + "<br/>" + "Nodo: " + this.lastNodo() + "<br/>" + "Precio: " + scaleValue.value }
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
                    rotationAngle: "-64",
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
                },
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: "bottom"
            },
            title: {
                text: "Consumo eléctrico<br/>últimos 7 días",
                font: { size: 14 },
                subtitle: { text: "(KwH, día equivalente)", font: { size: 10, opacity: 0.8 } }
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
                filter: [['FechaHoraJS', '>=', this.getLastMonth()]]     //['FechaHoraUTC', '<=', Date.parse(new Date().toUTCString())], "and", ['FechaHoraUTC', '>=', Date.parse(new Date().toUTCString()) - 86400000*21]
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
                    //    var weekday = new Array(7);
                    //    weekday[0] = "Domingo";
                    //    weekday[1] = "Lunes";
                    //    weekday[2] = "Martes";
                    //    weekday[3] = "Miercoles";
                    //    weekday[4] = "Jueves";
                    //    weekday[5] = "Viernes";
                    //    weekday[6] = "Sabado";
                    //    return weekday[FechaHora.getDay()];
                    //}
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
                text: "Consumo eléctrico<br/>últimos 30 días",
                font: { size: 14 },
                subtitle: { text: "(KwH, día equivalente)", font: { size: 10, opacity: 0.8 } }
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

        chartWeekPrecio: any = {
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
                    rotationAngle: "-64",
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
                    axis: "Precio",
                    color: "#5dcc5d",
                    valueField: "Precio",
                    point: {
                        size: 7
                    },
                    type: "bar",
                    aggregation: {
                        enabled: true,
                        method: "sum"
                    },
                    name: "Precio total día"
                }
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: "bottom"
            },
            title: {
                text: "Costo diario<br/>últimos 7 días",
                font: { size: 14 },
                subtitle: { text: "($CLP, día equivalente)", font: { size: 10, opacity: 0.8 } }
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
                        text: "Fecha: " + slice + "<br/>" + "Precio: $" + Math.round(arg.value)
                    }
                }
            }
        }

        chartMonthPrecio: any = {
            palette: "Dark Violet",
            dataSource: new DevExpress.data.DataSource({
                store: this.customStore,                                // v Esto para filtrar con date en milisegundos. v
                filter: [['FechaHoraJS', '>=', this.getLastMonth()]]     //['FechaHoraUTC', '<=', Date.parse(new Date().toUTCString())], "and", ['FechaHoraUTC', '>=', Date.parse(new Date().toUTCString()) - 86400000*21]
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
                    rotationAngle: "-64",
                    //format: (FechaHora) => {
                    //    var weekday = new Array(7);
                    //    weekday[0] = "Domingo";
                    //    weekday[1] = "Lunes";
                    //    weekday[2] = "Martes";
                    //    weekday[3] = "Miercoles";
                    //    weekday[4] = "Jueves";
                    //    weekday[5] = "Viernes";
                    //    weekday[6] = "Sabado";
                    //    return weekday[FechaHora.getDay()];
                    //}
                },
                tickInterval: { days: 1 }
            },
            series: [
                {
                    axis: "Precio",
                    color: "#5dcc5d",
                    valueField: "Precio",
                    point: {
                        size: 7
                    },
                    type: "bar",
                    aggregation: {
                        enabled: true,
                        method: "sum"
                    },
                    name: "Precio total día"
                }
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: "bottom"
            },
            title: {
                text: "Costo de energía diario<br/>últimos 30 días",
                font: { size: 14 },
                subtitle: { text: "($CLP, por día)", font: { size: 10, opacity: 0.8 } }
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
                        text: "Fecha: " + slice + "<br/>" + "Precio: $" + Math.round(arg.value)
                    }
                }
            }
        }
    }
}