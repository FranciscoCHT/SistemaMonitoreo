﻿@Code
    ViewData("Title") = "Index"
End Code

<section class="content-header" style="border-bottom: 1px solid #000;padding-bottom: 10px; margin-left:10px;margin-right: 10px;">
    <h1>
        <span style="text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Control de nodos</span>
        <small>Interfaz para poder controlar todos los nodos de control del sistema.</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="/Home"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Control Nodos</li>
    </ol>
</section>

<link rel="dx-theme" data-theme="generic.greenmist" href="https://cdn3.devexpress.com/jslib/18.2.5/css/dx.greenmist.css" />

<div id="cuerpo" style="margin-bottom:0px; margin-top:20px;" class="dx-fieldset">
    <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Seleccione sector/nodo:</b></span>
    <div class="dx-field" style="display: flex; flex-direction: row; justify-content: flex-start; align-items: stretch; width: auto; height: auto; flex-basis: 0px; flex-grow: 1; border-top: 1px solid #7eb2be;padding-bottom: 16px;padding-top: 8px; margin-bottom: 0px;">
        <div class="dx-item dx-box-item dx-item-content dx-box-item-content" style="display: flex; min-width: auto; flex: 1 1 0px; width: auto;height: auto;flex-basis: 0px;flex-grow: 1;flex-direction: column; padding-right: 15px;">
            <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Sector">
                <span class="dx-field-item-label-content" style="width: 46px;font-size:12px;">
                    <span class="dx-field-item-label-text">Sector:</span>
                </span>
            </label>
            <div id="selectSect" data-bind="dxSelectBox: sectFilter"></div>
        </div>
        <div class="dx-item dx-box-item dx-item-content dx-box-item-content" style="display: flex; min-width: auto; flex: 1 1 0px; width: auto;height: auto;flex-basis: 0px;flex-grow: 1;flex-direction: column; padding-left: 15px;">
            <label class="dx-field-item-label dx-field-item-label-location-top" for="dx_dx-e344b929-29e2-9de5-484a-2570a7dd3fa5_Nodo">
                <span class="dx-field-item-label-content" style="width: 41px;font-size:12px;">
                    <span class="dx-field-item-label-text">Nodo:</span>
                </span>
            </label>
            <div id="selectNodo" data-bind="dxSelectBox: nodoFilter"></div>
        </div>
    </div>

    <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Nodo de control</b></span>
    <div class="" style="-webkit-column-count: 1;-webkit-column-width: 100px;-webkit-column-gap: 4em;-webkit-column-rule: 1px dotted #ddd;border-top: 1px solid #7eb2be;padding-top: 30px;">
        <div id="formControl" data-bind="dxForm: formControl" style="padding-bottom:30px; margin: 0 auto;text-align:center"></div>
    </div>

    <div style="-webkit-column-count: 1;-webkit-column-width: 130px; margin-bottom:10px;text-align:center;">
        <div id="onButton" data-bind="dxButton: onButton"></div>
        <div id="offButton" data-bind="dxButton: offButton"></div>
    </div>

</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Control/control.js"></script>
    <script>
            ko.applyBindings(new Control.ControlIndexViewModel());
    </script>
End Section