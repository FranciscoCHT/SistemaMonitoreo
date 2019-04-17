/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Nodos {
    'use strict'
    export class NodoHistoricoIndexViewModel {

        public lectura: KnockoutObservableArray<any> = ko.observableArray<any>();
        public tipoNodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public nombreTipo: KnockoutObservable<any> = ko.observable<any>();
        public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        chartHist: any = {
            //palette: "Violet",
            //dataSource: this.lectura,
            //commonSeriesSettings: {
            //    argumentField: "FechaHora"
            //},
            //margin: {
            //    bottom: 20
            //},
            //argumentAxis: {
            //    valueMarginsEnabled: false,
            //    discreteAxisDivisionMode: "crossLabels",
            //    grid: {
            //        visible: true
            //    }
            //},
            //series: [
            //    { valueField: "Kwh", name: "Kwh" }
            //],
            //legend: {
            //    verticalAlignment: "bottom",
            //    horizontalAlignment: "center",
            //    itemTextPosition: "bottom"
            //},
            //title: {
            //    text: "Energy Consumption in 2004",
            //    subtitle: {
            //        text: "(Millions of Tons, Oil Equivalent)"
            //    }
            //},
            //"export": {
            //    enabled: true
            //},
            //tooltip: {
            //    enabled: true,
            //    customizeTooltip: function (arg) {
            //        return {
            //            text: arg.valueText
            //        };
            //    }
            //}
            dataSource: [
                {
                    "arg": "Monday",
                    "val": 3
                },
                {
                    "arg": "Tuesday",
                    "val": 2
                },
                {
                    "arg": "Wednesday",
                    "val": 3
                },
                {
                    "arg": "Thursday",
                    "val": 4
                },
                {
                    "arg": "Friday",
                    "val": 6
                },
                {
                    "arg": "Saturday",
                    "val": 11
                },
                {
                    "arg": "Sunday",
                    "val": 4
                }
            ],
            series: {}
        }
        
    }
}