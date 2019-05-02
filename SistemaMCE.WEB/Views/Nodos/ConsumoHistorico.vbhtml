@Code
    ViewData("Title") = "ConsumoHistorico"
End Code

<section class="content-header" style="border-bottom: 1px solid #000;padding-bottom: 10px; margin-left:10px;margin-right: 10px;">
    <h1>
        <span style="text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Consumo histórico</span>
        <small>Consumo histórico de cada nodo en un período de tiempo.</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="/Home"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li>Nodos</li>
        <li class="active">Consumo histórico</li>
    </ol>
</section>

<link rel="dx-theme" data-theme="generic.greenmist" href="https://cdn3.devexpress.com/jslib/18.2.5/css/dx.greenmist.css" />

<div id="cuerpo" style="margin-bottom:0px; margin-top:20px;" class="dx-fieldset">
    <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Seleccione sector/nodo:</b></span>
    <div class="" style="-webkit-column-count: 2;-webkit-column-width: 300px;-webkit-column-gap: 2em;border-top: 1px solid #7eb2be;padding-bottom: 16px;padding-top: 8px; margin-bottom: 0px;">
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
        <div style="-webkit-column-count: 2;-webkit-column-width: 150px;">
            <div>
                <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Sector">
                    <span class="dx-field-item-label-content" style="width: 46px;font-size:12px;">
                        <span class="dx-field-item-label-text">Mes:</span>
                    </span>
                </label>
                <div id="selectMes" data-bind="dxSelectBox: mesFilter" style="overflow:hidden;"></div>
            </div>
            <div>
                <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Nodo">
                    <span class="dx-field-item-label-content" style="width: 41px;font-size:12px;">
                        <span class="dx-field-item-label-text">Año:</span>
                    </span>
                </label>
                <div id="selectAño" data-bind="dxSelectBox: añoFilter" style="overflow:hidden;"></div>
            </div>
        </div>
    </div>

    <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Consumo histórico en la fecha seleccionada</b></span>
    <div class="" style="-webkit-column-count: 2;-webkit-column-width: 280px;-webkit-column-gap: 4em;-webkit-column-rule: 1px dotted #ddd;border-top: 1px solid #7eb2be;padding-top: 4px;padding-bottom: 20px;">
        <div id="chartYear" data-bind="dxChart: chartYear"></div>
        <div id="chartMonth" data-bind="dxChart: chartMonth"></div>
    </div>

    <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Precio histórico en la fecha seleccionada</b></span>
    <div class="" style="-webkit-column-count: 2;-webkit-column-width: 280px;-webkit-column-gap: 4em;-webkit-column-rule: 1px dotted #ddd;border-top: 1px solid #7eb2be;padding-top: 4px;">
        <div id="chartYearPrecio" data-bind="dxChart: chartYearPrecio"></div>
        <div id="chartMonthPrecio" data-bind="dxChart: chartMonthPrecio"></div>
    </div>

    <div style="-webkit-column-count: 2;-webkit-column-width: 130px; margin-bottom:10px;">
        <div style="text-align:center;">
            <div id="buttonYear" data-bind="dxButton: buttonYear" style="margin-bottom:8px;"></div>
        </div>
        <div style="text-align:center;">
            <div id="buttonMes" data-bind="dxButton: buttonMes" ></div>
        </div>
    </div>

    <div class="dx-field" style="display: none;">
        <div id="gridLectura" style="margin: 0 auto;" data-bind="dxDataGrid: gridLectura"></div>
    </div>

    <div id="gridPopup" data-bind="dxPopup: gridPopup"></div>

</div>

    @section scripts
        <script type="text/javascript" src="~/Scripts/app/Nodos/nodohistorico.js"></script>
        <script>
            ko.applyBindings(new Nodos.NodoHistoricoIndexViewModel());
        </script>
    End Section
