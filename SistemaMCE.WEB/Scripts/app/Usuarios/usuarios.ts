/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Usuarios {
    'use strict'
    export class UsuariosIndexViewModel {

        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        public limpiarForm() {
            let formData: any = $('#form-usuarios').dxForm('option').formData;
            formData.ID = 0;
            formData.Nombre = "";
            formData.Apellido = "";
            formData.User = "";
            formData.Pass = "";
            formData.EsAdmin = false;
        };

        getUsuarios(): void {
            this.usuarios([]);
            let url = 'api/usuarios';
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
                for (var i: number = 0; i < data.length; i++) {
                    this.usuarios.push({
                        ID: data[i].ID,
                        Nombre: data[i].Nombre,
                        Apellido: data[i].Apellido,
                        User: data[i].User,
                        Pass: data[i].Pass,
                        EsAdmin: data[i].EsAdmin
                    });
                }
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        addUsuarios(): void {

            let formData: any = $('#form-usuarios').dxForm('option').formData;

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

            let url = 'api/usuarios';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    ID: formData.ID,
                    Nombre: formData.Nombre,
                    Apellido: formData.Apellido,
                    User: formData.User,
                    Pass: formData.Pass,
                    EsAdmin: formData.EsAdmin
                }
            }).done((data: any) => {
                DevExpress.ui.notify("Datos guardados correctamente.", "success", 2000);
                $('#form-usuarios').dxForm('instance').resetValues();
                this.getUsuarios();
                let grid = $('#grid-usuarios').dxDataGrid('instance');
                // this.limpiarForm();
                this.enable(true);
                grid.refresh();
                grid.repaint();
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        deleteUsuario(id: number): void {
            let url = 'api/usuarios/' + id;
            $.ajax({
                type: 'DELETE',
                url: url
            }).done((data: any) => {
                $('#form-usuarios').dxForm('instance').resetValues();
                this.limpiarForm();
                this.enable(true);
                DevExpress.ui.notify("Usuario eliminado satisfactoriamente", "success", 3000);
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        };

        constructor() {
            this.getUsuarios();
        }

        formOptions: any = {
            formData: this.usuarios,
            labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 1,
                items: [{
                    dataField: "Nombre",
                    editorType: "dxTextBox",
                    editorOptions: {
                        placeholder: "Ej. Juan",
                        showClearButton: true
                    }
                }, {
                    dataField: "Apellido",
                    editorType: "dxTextBox",
                    editorOptions: {
                        placeholder: "Ej. Perez",
                        showClearButton: true
                    }
                }, {
                    dataField: "User",
                    editorType: "dxTextBox",
                    label: { text: 'Nombre de Usuario' },
                    editorOptions: {
                        placeholder: "Ej. JuanPerez31",
                        showClearButton: true
                    }
                }, {
                    dataField: "Pass",
                    editorType: "dxTextBox",
                    label: { text: 'Contraseña' },
                    editorOptions: {
                        mode: 'password',
                        showClearButton: true
                    }
                }, {
                    dataField: "EsAdmin",
                    editorType: "dxSwitch",
                    label: { text: 'Habilitar administrador' },
                    editorOptions: {
                        switchedOnText: 'SI',
                        switchedOffText: 'NO',
                        name: "switch"
                    }
                }]
            }]
        };

        buttonOptionsDelete: any = {
            text: "Borrar",
            icon: "remove",
            type: 'danger',
            disabled: this.enable,
            onClick: () => {
                let grid = $('#grid-usuarios').dxDataGrid('instance');
                grid.deleteRow(this.idRowIndex());
                grid.repaint();
            }
        }

        dataGridOptions: any = {
            dataSource: this.usuarios,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            selection: {
                mode: "single"
            },
            columns: [{ dataField: 'ID', visible: false }, 'Nombre', 'Apellido', { dataField: 'User', caption: 'Nombre de Usuario' }, { dataField: 'Pass', caption: 'Contraseña' }, { dataField: 'EsAdmin', caption: 'Administrador', width: "12%" }],
            editing: {
                texts: {
                    confirmDeleteMessage: '¿Esta seguro de eliminar registro de usuario?'
                }
            },
            onRowRemoved: () => {
                let index = this.idRow();
                this.deleteUsuario(index);
            },
            grouping: {
                allowCollapsing: true
            },
            export: {
                allowExportSelectedData: true,
                enabled: true,
                fileName: 'usuarios'
            }, columnChooser: {
                allowSearch: true
            },
            showBorders: true
            , rowAlternationEnabled: true
            , showRowLines: true
            , showColumnLines: false
            , filterRow: {
                visible: true,
                showOperationChooser: true,
                applyFilter: "auto"
            },
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: "Buscar..."
            },
            onRowClick: (e) => {
                this.enable(false);
                let formData: any = $('#form-usuarios').dxForm('option');
                let usuarioData: any = {
                    ID: e.data.ID,
                    Nombre: e.data.Nombre,
                    Apellido: e.data.Apellido,
                    User: e.data.User,
                    Pass: e.data.Pass,
                    EsAdmin: e.data.EsAdmin
                }
                //this.nombreRol(usuarioData.Rol);
                this.idRow(usuarioData.ID);
                this.idRowIndex(e.rowIndex);
                formData.formData = usuarioData;
                let form = $('#form-usuarios').dxForm('instance');
                form.repaint();
            }
        };

        formPopup: any = {
            visible: false,
            width: 500,
            height: 510,
            position: {
                my: 'center',
                at: 'center',
                of: window
            },
            dragEnabled: true,
            closeOnOutsideClick: true,
            contentTemplate: (e) => {
                return $('#form-usuarios')
            },
            toolbarItems: [{
                toolbar: 'top',
                text: "Añadir usuario",
                location: "center"
            }, {
                widget: "dxButton",
                toolbar: 'bottom',
                location: "after",
                options: {
                    text: "Añadir",
                    icon: "plus",
                    type: 'success',
                    onClick: () => {
                        this.addUsuarios();
                        let popForm = $('#form-popup').dxPopup('instance');
                        popForm.hide();
                    }
                }
            }]
        };

        addPopup: any = {
            text: "Agregar",
            icon: "plus",
            type: 'success',
            onClick: (e) => {
                $('#form-usuarios').dxForm('instance').resetValues();
                this.limpiarForm();
                this.idRow(0);
                this.enable(true);
                let popForm = $('#form-popup').dxPopup('instance');
                popForm.show();
            }
        }

        modifPopup: any = {
            text: "Modificar",
            icon: "edit",
            type: 'default',
            disabled: this.enable,
            onClick: (e) => {
                let popForm = $('#form-popup').dxPopup('instance');
                popForm.show();
            }
        }
    }
}