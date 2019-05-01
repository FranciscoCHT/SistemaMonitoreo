/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Nodos {
    'use strict'
    export class NodosIndexViewModel {

        public nodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public tipoNodos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public nombreTipo: KnockoutObservable<any> = ko.observable<any>();
        public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        public limpiarForm() {
            let formData: any = $('#form-nodos').dxForm('option').formData;
            formData.ID = 0;
            formData.Nombre = "";
            formData.Tipo = "";
            formData.Estado = "";
            formData.Voltaje = "";
            formData.Sector = "";
            formData.Usuario = "";
        };

        getNodosByUser(user: any, sect: any): void {
            this.nodos([]);
            let url = 'api/nodos/' + sect + '/' + user;
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
                for (var i: number = 0; i < data.length; i++) {
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
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        getSectores(): void {
            this.sectores([]);
            let url = 'api/sectores';
            $.ajax({
                type: 'GET',
                url: url,
            }).done((data: any) => {
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

        getUsuarios(user: any, esGrid: any): void {
            this.usuarios([]);
            let url = 'api/usuarios/' + user + '/' + esGrid;
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

        addNodos(): void {

            let formData: any = $('#form-nodos').dxForm('option').formData;

            if (formData.Nombre === "" || formData.Nombre === null || formData.Nombre === undefined) {
                DevExpress.ui.notify("No se puede crear nodo, falta nombre.", "error", 3000);
                return;
            }
            if (formData.Tipo === "" || formData.Tipo === null || formData.Tipo === undefined) {
                DevExpress.ui.notify("No se puede crear nodo, falta tipo.", "error", 3000);
                return;
            }
            //if (formData.Estado === "" || formData.Estado === null || formData.Estado === undefined) {
            //    DevExpress.ui.notify("No se puede crear nodo, falta estado.", "error", 3000);
            //    return;
            //}
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
                    Estado: formData.Estado,
                    Voltaje: formData.Voltaje,
                    SectorID: formData.Sector,
                    UsuarioID: formData.Usuario,
                    UsuarioLogin: window.localStorage.getItem('user')
                }
            }).done((data: any) => {
                DevExpress.ui.notify("Datos guardados correctamente.", "success", 2000);
                $('#form-nodos').dxForm('instance').resetValues();
                this.getNodosByUser(window.localStorage.getItem('user'), -1);
                let grid = $('#grid-nodos').dxDataGrid('instance');
                // this.limpiarForm();
                this.enable(true);
                grid.refresh();
                grid.repaint();
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        deleteNodo(user: string, id: number): void {
            let url = 'api/nodos/' + user + '/' + id;
            $.ajax({
                type: 'DELETE',
                url: url
            }).done((data: any) => {
                $('#form-nodos').dxForm('instance').resetValues();
                this.limpiarForm();
                this.enable(true);
                DevExpress.ui.notify("Nodo eliminado satisfactoriamente", "success", 3000);
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        };

        constructor() {
            if (window.localStorage.getItem('user') === null || window.localStorage.getItem('user') == undefined) {
                window.location.replace(window.location.origin + '/Login');
            }
            this.getUsuarios(window.localStorage.getItem('user'), 'nogrid');
            this.getSectores();
            this.getNodosByUser(window.localStorage.getItem('user'), -1);
            $.getJSON('api/nodos/tipos').then((result: any): void => {
                for (var i: number = 0; i < result.tipoNodo.length; i++) {
                    this.tipoNodos.push({
                        Nombre: result.tipoNodo[i].Nombre,
                        Clave: result.tipoNodo[i].Clave,
                    });
                }
            });
        }

        formOptions: any = {
            formData: this.nodos,
            labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 1,
                items: [{
                    dataField: "Nombre",
                    editorType: "dxTextBox",
                    editorOptions: {
                        placeholder: "Ej. Dpto. 1 Num. 2, Lab. 1 Router 2...",
                        showClearButton: true
                    }
                }, {
                    dataField: "Tipo",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        dataSource: this.tipoNodos,
                        placeholder: "Seleccione el tipo de nodo...",
                        displayExpr: 'Nombre',
                        valueExpr: 'Clave',
                        value: this.nombreTipo
                    }
                }, {
                    dataField: "Estado",
                    editorType: "dxSwitch",
                    editorOptions: {
                        name: "switch"
                    }
                }, {
                    dataField: "Voltaje",
                    editorType: "dxNumberBox",
                    label: { text: 'Voltaje (en V)' },
                    editorOptions: {
                        showClearButton: true,
                        placeholder: "220",
                    }
                }, {
                    dataField: "Sector",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        dataSource: this.sectores,
                        placeholder: "Seleccione el sector...",
                        displayExpr: 'Nombre',
                        valueExpr: 'ID'
                    }
                }, {
                    dataField: "Usuario",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        dataSource: this.usuarios,
                        placeholder: "Seleccione el usuario a cargo...",
                        displayExpr: 'User',
                        valueExpr: 'ID'
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
                let grid = $('#grid-nodos').dxDataGrid('instance');
                grid.deleteRow(this.idRowIndex());
                grid.repaint();
            }
        }

        dataGridOptions: any = {
            dataSource: this.nodos,
            widthasd: "80%",
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            selection: {
                mode: "single"
            },
            columns: [{ dataField: 'ID', visible: false }, { dataField: 'Estado', caption: 'Activo', width: '7%' }, 'Nombre', { dataField: 'TipoStr', caption: 'Tipo' }, 'Sector.Nombre', { dataField: 'Voltaje', alignment: "left", width: '10%' }, { dataField: 'Usuario.User', caption: 'Usuario' } ],
            editing: {
                texts: {
                    confirmDeleteMessage: '¿Esta seguro de eliminar registro de nodo?'
                }
            },
            onRowRemoved: () => {
                let index = this.idRow();
                this.deleteNodo(window.localStorage.getItem('user'), index);
            },
            grouping: {
                allowCollapsing: true
            },
            export: {
                allowExportSelectedData: true,
                enabled: true,
                fileName: 'nodos'
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
                let formData: any = $('#form-nodos').dxForm('option');
                let usuarioData: any = {
                    ID: e.data.ID,
                    Nombre: e.data.Nombre,
                    Tipo: e.data.Tipo,
                    Estado: e.data.Estado,
                    Voltaje: e.data.Voltaje,
                    Sector: e.data.Sector.ID,
                    Usuario: e.data.Usuario.ID
                }
                this.nombreTipo(usuarioData.Tipo);
                this.idRow(usuarioData.ID);
                this.idRowIndex(e.rowIndex);
                formData.formData = usuarioData;
                let form = $('#form-nodos').dxForm('instance');
                form.repaint();
            }
        };

        formPopup: any = {
            visible: false,
            width: 380,
            height: "auto",
            position: {
                my: 'center',
                at: 'center',
                of: window
            },
            dragEnabled: true,
            closeOnOutsideClick: true,
            contentTemplate: (e) => {
                return $('#form-nodos')
            },
            toolbarItems: [{
                toolbar: 'top',
                text: "Añadir nodos",
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
                        this.addNodos();
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
                $('#form-nodos').dxForm('instance').resetValues();
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