@Code
    ViewData("Title") = "Index"
End Code

<section class="content-header" style="border-bottom: 1px solid #000;padding-bottom: 10px; margin-left:10px;margin-right: 10px;">
    <h1>
        <span style="text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Reporte de lecturas</span>
        <small>Reporte de todas las lecturas en un tiempo determinado.</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="/Home"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Reporte Lecturas</li>
    </ol>
</section>

<link rel="dx-theme" data-theme="generic.greenmist" href="https://cdn3.devexpress.com/jslib/18.2.5/css/dx.greenmist.css" />

<div id="cuerpo" style="margin-bottom:0px; margin-top:20px;" class="dx-fieldset">
    <div style="-webkit-column-count: 2;-webkit-column-width: 280px;-webkit-column-gap: 2em;margin-bottom:15px;">
        <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Seleccione sector/nodo:</b></span>
        <div class="" style="-webkit-column-count: 1;-webkit-column-width: 300px;-webkit-column-gap: 2em;border-top: 1px solid #7eb2be;padding-bottom: 16px;padding-top: 8px; margin-bottom: 0px;">
            <div style="-webkit-column-count: 2;-webkit-column-width: 150px;">
                <div>
                    <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Sector">
                        <span class="dx-field-item-label-content" style="width: 46px;font-size:12px;">
                            <span class="dx-field-item-label-text">Sector:</span>
                        </span>
                    </label>
                    <div id="selectSect" data-bind="dxSelectBox: sectFilter" style="overflow:hidden;"></div>
                </div>
                <div>
                    <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Nodo">
                        <span class="dx-field-item-label-content" style="font-size:12px;">
                            <span class="dx-field-item-label-text">Nodo:</span>
                        </span>
                    </label>
                    <div id="selectNodo" data-bind="dxSelectBox: nodoFilter" style="overflow:hidden;"></div>
                </div>
            </div>
        </div>

        <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Seleccione fecha:</b></span>
        <div class="" style="-webkit-column-count: 1;-webkit-column-width: 300px;-webkit-column-gap: 2em;border-top: 1px solid #7eb2be;padding-bottom: 16px;padding-top: 8px; margin-bottom: 0px;">
            <div style="-webkit-column-count: 2;-webkit-column-width: 150px;">
                <div>
                    <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Sector">
                        <span class="dx-field-item-label-content" style="width: 46px;font-size:12px;">
                            <span class="dx-field-item-label-text">Fecha Inicio:</span>
                        </span>
                    </label>
                    <div id="dateStart" data-bind="dxDateBox: dateStart" style="overflow:hidden;"></div>
                </div>
                <div>
                    <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Nodo">
                        <span class="dx-field-item-label-content" style="width: 41px;font-size:12px;">
                            <span class="dx-field-item-label-text">Fecha Término:</span>
                        </span>
                    </label>
                    <div id="dateEnd" data-bind="dxDateBox: dateEnd" style="overflow:hidden;"></div>
                </div>
            </div>
        </div>
    </div>

    <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Consumo histórico en la fecha seleccionada</b></span>
    <div class="" style="-webkit-column-count: 1;-webkit-column-width: 280px;-webkit-column-gap: 5em;border-top: 1px solid #7eb2be;padding-bottom: 16px;padding-top: 16px; margin-bottom: 0px;">
        <div id="gridLectura" data-bind="dxDataGrid: gridLectura"></div>
    </div>

</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Reportes/reportes.js"></script>
    <script>
        ko.applyBindings(new Reportes.ReportesIndexViewModel());
    </script>
End Section