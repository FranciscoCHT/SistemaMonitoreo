/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Home {
    'use strict'
    export class ConfigIndexViewModel {
        public disableOn: KnockoutObservable<boolean> = ko.observable(true);
        public conf: KnockoutObservable<any> = ko.observable<any>();

        postConf(): void {

            let formData: any = $('#formConf').dxForm('option').formData;

            if (formData.NLectura === "" || formData.NLectura === null || formData.NLectura === undefined) {
                DevExpress.ui.notify("No se puede guardar, falta número de lecturas en segundos.", "error", 3000);
                return;
            }
            if (formData.PrecioKwh === "" || formData.PrecioKwh === null || formData.PrecioKwh === undefined) {
                DevExpress.ui.notify("No se puede guardar, falta precio del KWh.", "error", 3000);
                return;
            }

            let url = 'api/home';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    NLectura: formData.NLectura,
                    PrecioKwh: formData.PrecioKwh,
                    UsuarioLogin: window.localStorage.getItem('user')
                }
            }).done((data: any) => {
                DevExpress.ui.notify("Datos guardados correctamente.", "success", 2000);
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        getConf(user: any): void {
            this.conf([]);
            let url = window.location.origin + '/api/home/' + user;
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
                this.conf({
                    NLectura: data[0],
                    PrecioKwh: data[1]
                });
                let form: any = $('#formConf').dxForm('instance');
                form.option('formData', this.conf());
                form.repaint();
                if (data != "") {
                    this.disableOn(false);
                } else {
                    this.disableOn(true);
                }
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        constructor() {
            if (window.localStorage.getItem('user') === null || window.localStorage.getItem('user') == undefined) {
                window.location.replace(window.location.origin + '/Login');
            }
            this.getConf(window.localStorage.getItem('user'));
        }

        formConf: any = {
            width: "340",
            labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 1,
                items: [{
                    itemType: "group",
                    colCount: 1,
                    items: [{
                        dataField: "NLectura",
                        editorType: "dxNumberBox",
                        label: { text: 'Toma de datos automática (en seg.)' },
                        colSpan: 1,
                        editorOptions: {
                        }
                    },
                    {
                        dataField: "PrecioKwh",
                        editorType: "dxNumberBox",
                        label: { text: 'Precio del KWh' },
                        colSpan: 1,
                        editorOptions: {
                        }
                    }]
                }]
            }]
        };

        onButton: any = {
            text: "Guardar",
            icon: "plus",
            disabled: this.disableOn,
            type: 'success',
            onClick: (e) => {
                this.postConf();
            }
        }
    }
}