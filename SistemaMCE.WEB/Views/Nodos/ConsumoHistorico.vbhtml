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

<div id="cuerpo" style="margin-bottom:70px; margin-top:20px;" class="dx-fieldset">
    <span class="dx-form-group-caption" style="color: #6a828e;">Seleccione sector/nodo:</span>
    <div class="dx-field" style="display: flex; flex-direction: row; justify-content: flex-start; align-items: stretch; width: auto; height: auto; flex-basis: 0px; flex-grow: 1; border-top: 1px solid #7eb2be; border-bottom: 1px solid #7eb2be; padding-bottom: 16px;padding-top: 8px; margin-top: 6px;margin-bottom: 24px;">
        <div class="dx-item dx-box-item dx-item-content dx-box-item-content" style="display: flex; min-width: auto; flex: 1 1 0px; width: auto;height: auto;flex-basis: 0px;flex-grow: 1;flex-direction: column; padding-right: 15px;">
            <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Sector">
                <span class="dx-field-item-label-content" style="width: 46px;">
                    <span class="dx-field-item-label-text">Sector:</span>
                </span>
            </label>
            <div id="selectSect" data-bind="dxSelectBox: sectFilter"></div>
        </div>
        <div class="dx-item dx-box-item dx-item-content dx-box-item-content" style="display: flex; min-width: auto; flex: 1 1 0px; width: auto;height: auto;flex-basis: 0px;flex-grow: 1;flex-direction: column; padding-left: 15px;">
            <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Nodo">
                <span class="dx-field-item-label-content" style="width: 41px;">
                    <span class="dx-field-item-label-text">Nodo:</span>
                </span>
            </label>
            <div id="selectNodo" data-bind="dxSelectBox: nodoFilter"></div>
        </div>
    </div>

    <div class="" style="-webkit-column-count: 2;-webkit-column-width: 280px;-webkit-column-gap: 5em;-webkit-column-rule: 1px dotted #ddd;">
        <div style="" id="gaugeDiaActual" data-bind="dxCircularGauge: gaugeDiaActual"></div>
        <div style="" id="gaugeLecturaActual" data-bind="dxCircularGauge: gaugeLecturaActual"></div>
    </div>
    <div class="dx-field">
        <div id="chartHist" data-bind="dxChart: chartHist"></div>
    </div>

</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Nodos/nodohistorico.js"></script>
    <script>
        ko.applyBindings(new Nodos.NodoHistoricoIndexViewModel());
    </script>
End Section