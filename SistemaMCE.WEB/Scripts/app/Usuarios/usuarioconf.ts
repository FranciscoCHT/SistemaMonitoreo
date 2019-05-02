/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Usuarios {
    'use strict'
    export class UsuarioConfIndexViewModel {

        public usuario: KnockoutObservable<any> = ko.observable<any>();
        public disable: KnockoutObservable<boolean> = ko.observable(true);
        public adminSwitch: KnockoutObservable<boolean> = ko.observable(true);

        public limpiarForm() {
            let formData: any = $('#form-usuarios').dxForm('option').formData;
            formData.ID = 0;
            formData.Nombre = "";
            formData.Apellido = "";
            formData.User = "";
            formData.Pass = "";
            formData.EsAdmin = false;
        };

        getUsuarioConf(user: any): void {
            this.usuario([]);
            let url = window.location.origin + '/api/usuarios/' + user;
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
                this.usuario({
                        ID: data.ID,
                        Nombre: data.Nombre,
                        Apellido: data.Apellido,
                        User: data.User,
                        Pass: data.Pass,
                        EsAdmin: data.EsAdmin
                });
                let form: any = $('#formUser').dxForm('instance');
                form.option('formData', this.usuario());
                if (data.EsAdmin == true) {
                    this.adminSwitch(false);
                    form.repaint();
                } else {
                    this.adminSwitch(true);
                    form.repaint();
                }
                this.disable(true);
                
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        postUsuarioConf(): void {

            let formData: any = $('#formUser').dxForm('option').formData;

            if (formData.Nombre === "" || formData.Nombre === null || formData.Nombre === undefined) {
                DevExpress.ui.notify("No se puede crear usuario, falta nombre.", "error", 3000);
                return;
            }
            if (formData.Apellido === "" || formData.Apellido === null || formData.Apellido === undefined) {
                DevExpress.ui.notify("No se puede crear usuario, falta apellido.", "error", 3000);
                return;
            }
            if (formData.User === "" || formData.User === null || formData.User === undefined) {
                DevExpress.ui.notify("No se puede crear usuario, falta nombre de usuario.", "error", 3000);
                return;
            }
            if (formData.Pass === "" || formData.Pass === null || formData.Pass === undefined) {
                DevExpress.ui.notify("No se puede crear usuario, falta la contraseña", "error", 3000);
                return;
            }
            if (formData.EsAdmin === "" || formData.EsAdmin === null || formData.EsAdmin === undefined) {
                DevExpress.ui.notify("No se puede crear usuario, falta definir tipo de cuenta.", "error", 3000);
                return;
            }

            let url = window.location.origin + '/api/usuarios/modificar';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    ID: formData.ID,
                    Nombre: formData.Nombre,
                    Apellido: formData.Apellido,
                    User: formData.User,
                    Pass: formData.Pass,
                    EsAdmin: formData.EsAdmin,
                    UsuarioLogin: window.localStorage.getItem('user')
                }
            }).done((data: any) => {
                DevExpress.ui.notify("Datos guardados correctamente.", "success", 2000);
                this.getUsuarioConf(window.localStorage.getItem('user'));
                this.disable(true);
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        constructor() {
            if (window.localStorage.getItem('user') === null || window.localStorage.getItem('user') == undefined) {
                window.location.replace(window.location.origin + '/Login');
            }
            this.getUsuarioConf(window.localStorage.getItem('user'));
        }

        formUser: any = {
            width: "345",
            labelLocation: "left",
            items: [{
                itemType: "group",
                colCount: 1,
                items: [{
                    dataField: "Nombre",
                    editorType: "dxTextBox",
                    editorOptions: {
                        placeholder: "Ej. Juan",
                        showClearButton: true,
                        onValueChanged: (e) => {
                            this.disable(false);
                        }
                    }
                }, {
                    dataField: "Apellido",
                    editorType: "dxTextBox",
                    editorOptions: {
                        placeholder: "Ej. Perez",
                        showClearButton: true,
                        onValueChanged: (e) => {
                            this.disable(false);
                        }
                    }
                }, {
                    dataField: "User",
                    editorType: "dxTextBox",
                    label: { text: 'Nombre de Usuario' },
                    editorOptions: {
                        placeholder: "Ej. JuanPerez31",
                        showClearButton: true,
                        onValueChanged: (e) => {
                            this.disable(false);
                        }
                    }
                }, {
                    dataField: "Pass",
                    editorType: "dxTextBox",
                    label: { text: 'Contraseña' },
                    editorOptions: {
                        //mode: 'password',
                        showClearButton: true,
                        onValueChanged: (e) => {
                            this.disable(false);
                        }
                    }
                }, {
                    dataField: "EsAdmin",
                    editorType: "dxSwitch",
                    label: { text: 'Habilitar administrador' },
                    editorOptions: {
                        switchedOnText: 'SI',
                        switchedOffText: 'NO',
                        name: "switch",
                        disabled: this.adminSwitch,
                        onValueChanged: (e) => {
                            this.disable(false);
                        }
                    }
                }]
            }]
        };

        buttonSave: any = {
            text: "Guardar",
            icon: "edit",
            type: 'success',
            disabled: this.disable,
            onClick: (e) => {
                this.postUsuarioConf();
                //let popForm = $('#form-popup').dxPopup('instance');
                //popForm.show();
            }
        }
    }
}