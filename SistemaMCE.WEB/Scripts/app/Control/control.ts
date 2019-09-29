/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Control {
    'use strict'
    export class ControlIndexViewModel {

        public usuario: KnockoutObservable<any> = ko.observable<any>();
        public disableOn: KnockoutObservable<boolean> = ko.observable(true);
        public disableOff: KnockoutObservable<boolean> = ko.observable(true);
        public onOff: KnockoutObservable<boolean> = ko.observable(null);
        public adminSwitch: KnockoutObservable<boolean> = ko.observable(true);
        public nodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public idNodo: KnockoutObservable<any> = ko.observable<any>(-1);
        public idSector: KnockoutObservable<any> = ko.observable<any>(-1);
        public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();

        updateNodoFilter() {
            let nodoFilterIns = $('#selectNodo').dxSelectBox('instance');       //
            nodoFilterIns.option('value', this.idNodo());                       //  Esto pone el valor del filtro en el IDNODO actual
        }

        updateFormData() {
            let form: any = $('#formControl').dxForm('instance');
            form.option('formData', this.usuario());
        }

        addNodos(): void {

            let formData: any = $('#formControl').dxForm('option').formData;

            if (formData.Nombre === "" || formData.Nombre === null || formData.Nombre === undefined) {
                DevExpress.ui.notify("No se puede crear nodo, falta nombre.", "error", 3000);
                return;
            }
            if (formData.Tipo === "" || formData.Tipo === null || formData.Tipo === undefined) {
                DevExpress.ui.notify("No se puede crear nodo, falta tipo.", "error", 3000);
                return;
            }
            if (formData.Estado === "" || formData.Estado === null || formData.Estado === undefined) {
                DevExpress.ui.notify("No se puede crear nodo, falta estado.", "error", 3000);
                return;
            }
            if (formData.Voltaje === "" || formData.Voltaje === null || formData.Voltaje === undefined) {
                DevExpress.ui.notify("No se puede crear nodo, falta definir voltaje", "error", 3000);
                return;
            }
            if (formData.Sector === "" || formData.Sector === null || formData.Sector === undefined) {
                DevExpress.ui.notify("No se puede crear nodo, falta seleccionar sector.", "error", 3000);
                return;
            }
            if (formData.Usuario === "" || formData.Usuario === null || formData.Usuario === undefined) {
                DevExpress.ui.notify("No se puede crear nodo, falta seleccionar usuario a cargo.", "error", 3000);
                return;
            }

            let url = 'api/nodos';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    ID: formData.ID,
                    Nombre: formData.Nombre,
                    Tipo: formData.Tipo,
                    Estado: this.onOff(),
                    Voltaje: formData.Voltaje,
                    SectorID: formData.Sector,
                    UsuarioID: formData.Usuario,
                    UsuarioLogin: window.localStorage.getItem('user')
                }
            }).done((data: any) => {
                DevExpress.ui.notify("Datos guardados correctamente.", "success", 2000);
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        getNodosByUser(user: any, sect: any): void {
            this.nodos([]);
            let url = window.location.origin + '/api/nodos/' + sect + '/' + user;
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
                for (var i: number = 0; i < data.length; i++) {
                    if (data[i].TipoStr == "Control") {
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
                this.updateNodoFilter();
                let form: any = $('#formControl').dxForm('instance');
                let nodoData: any = {
                    ID: this.nodos()[0].ID,
                    Nombre: this.nodos()[0].Nombre,
                    Tipo: this.nodos()[0].Tipo,
                    TipoStr: this.nodos()[0].TipoStr,
                    Estado: this.nodos()[0].Estado,
                    Voltaje: this.nodos()[0].Voltaje,
                    Sector: this.nodos()[0].Sector,
                    Usuario: this.nodos()[0].Usuario
                }
                form.option('formData', nodoData);
                if (this.nodos()[0].Estado == true) {
                    this.disableOff(false);
                    this.disableOn(true);
                } else {
                    this.disableOff(true);
                    this.disableOn(false);
                }
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
        }

        formControl: any = {
            width: "340",
            labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 1,
                items: [{
                    itemType: "group",
                    colCount: 1,
                    items: [{
                        dataField: "Nombre",
                        editorType: "dxTextBox",
                        colSpan: 1,
                        editorOptions: {
                        }
                    }]
                }]
            }]
        };

        onButton: any = {
            text: "Encender",
            icon: "check",
            disabled: this.disableOn,
            type: 'success',
            onClick: (e) => {
                this.disableOff(false);
                this.disableOn(true);
                this.onOff(true);
                this.addNodos();
                var req = new XMLHttpRequest();
                req.open("POST", "http://192.168.0.5:5204/"); //Acceso a servicio de control Processing -- Para global, abrir puerto y cambiar a IP pública
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                req.send("?" + "E" + this.idNodo());
            }
        }

        offButton: any = {
            text: "Apagar",
            icon: "close",
            disabled: this.disableOff,
            type: 'danger',
            onClick: (e) => {
                this.disableOff(true);
                this.disableOn(false);
                this.onOff(false);
                this.addNodos();
                var req = new XMLHttpRequest();
                req.open("POST", "http://192.168.0.5:5204/"); //Acceso a servicio de control Processing -- Para global, abrir puerto y cambiar a IP pública
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                req.send("?" + "A" + this.idNodo());
            }
        }

        nodoFilter: any = {
            dataSource: this.nodos,
            width: "auto",
            placeholder: "Seleccione nodo a visualizar...",
            displayExpr: 'Nombre',
            valueExpr: 'ID',
            value: this.idNodo(),
            onItemClick: (e) => {
                this.idNodo(e.itemData.ID);
                let form: any = $('#formControl').dxForm('instance');
                let nodoData: any = {
                    ID: e.itemData.ID,
                    Nombre: e.itemData.Nombre,
                    Tipo: e.itemData.Tipo,
                    TipoStr: e.itemData.TipoStr,
                    Estado: e.itemData.Estado,
                    Voltaje: e.itemData.Voltaje,
                    Sector: e.itemData.Sector,
                    Usuario: e.itemData.Usuario
                }
                form.option('formData', nodoData);
                if (e.itemData.Estado == true) {
                    this.disableOff(false);
                    this.disableOn(true);
                } else {
                    this.disableOff(true);
                    this.disableOn(false);
                }
                form.repaint();
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
            }
        }
    }
}