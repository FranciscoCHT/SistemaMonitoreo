/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Sectores {
    'use strict'
    export class SectoresIndexViewModel {

        public sectores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);

        public limpiarForm() {
            let formData: any = $('#form-sectores').dxForm('option').formData;
            formData.ID = 0;
            formData.Nombre = "";
        };

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

        addSectores(): void {

            let formData: any = $('#form-sectores').dxForm('option').formData;

            if (formData.Nombre === "" || formData.Nombre === null || formData.Nombre === undefined) {
                DevExpress.ui.notify("No se puede crear sector, falta nombre.", "error", 3000);
                return;
            }

            let url = 'api/sectores';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    ID: formData.ID,
                    Nombre: formData.Nombre
                }
            }).done((data: any) => {
                DevExpress.ui.notify("Datos guardados correctamente.", "success", 2000);
                $('#form-sectores').dxForm('instance').resetValues();
                this.getSectores();
                let grid = $('#grid-sectores').dxDataGrid('instance');
                // this.limpiarForm();
                this.enable(true);
                grid.refresh();
                grid.repaint();
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        deleteSector(id: number): void {
            let url = 'api/sectores/' + id;
            $.ajax({
                type: 'DELETE',
                url: url
            }).done((data: any) => {
                $('#form-sectores').dxForm('instance').resetValues();
                this.limpiarForm();
                this.enable(true);
                DevExpress.ui.notify("Sector eliminado satisfactoriamente", "success", 3000);
            }).fail((data: any) => {
                DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        };

        constructor() {
            this.getSectores();
        }

        formOptions: any = {
            formData: this.sectores,
            labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 1,
                items: [{
                    dataField: "Nombre",
                    editorType: "dxTextBox",
                    editorOptions: {
                        placeholder: "Ej. Cocina, Departamento B...",
                        showClearButton: true
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
                let grid = $('#grid-sectores').dxDataGrid('instance');
                grid.deleteRow(this.idRowIndex());
                grid.repaint();
            }
        }

        dataGridOptions: any = {
            dataSource: this.sectores,
            width: "80%",
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            selection: {
                mode: "single"
            },
            columns: [{ dataField: 'ID', width: "12%", alignment: "left" }, { dataField: 'Nombre', caption: 'Nombre de Sector' }],
            editing: {
                texts: {
                    confirmDeleteMessage: '¿Esta seguro de eliminar registro de sector?'
                }
            },
            onRowRemoved: () => {
                let index = this.idRow();
                this.deleteSector(index);
            },
            grouping: {
                allowCollapsing: true
            },
            export: {
                allowExportSelectedData: true,
                enabled: true,
                fileName: 'sectores'
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
                let formData: any = $('#form-sectores').dxForm('option');
                let sectorData: any = {
                    ID: e.data.ID,
                    Nombre: e.data.Nombre
                }
                this.idRow(sectorData.ID);
                this.idRowIndex(e.rowIndex);
                formData.formData = sectorData;
                let form = $('#form-sectores').dxForm('instance');
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
                return $('#form-sectores')
            },
            toolbarItems: [{
                toolbar: 'top',
                text: "Añadir sector",
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
                        this.addSectores();
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
                $('#form-sectores').dxForm('instance').resetValues();
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