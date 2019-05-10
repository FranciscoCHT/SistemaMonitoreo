@Code
    ViewData("Title") = "Historial"
End Code

<section class="content-header" style="border-bottom: 1px solid #000;padding-bottom: 10px; margin-left:10px;margin-right: 10px;">
    <h1>
        <span style="text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Historial de reportes</span>
        <small>Historial de todos los reportes creados en el sistema, con su fecha, y sus datos de solicitud.</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="/Home"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Reporte Lecturas</li>
    </ol>
</section>

<link rel="dx-theme" data-theme="generic.greenmist" href="https://cdn3.devexpress.com/jslib/18.2.5/css/dx.greenmist.css" />

<div id="cuerpo" style="margin-bottom:0px; margin-top:20px;" class="dx-fieldset">
    <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Reportes</b></span>
    <div class="" style="-webkit-column-count: 1;-webkit-column-width: 280px;-webkit-column-gap: 5em;border-top: 1px solid #7eb2be;padding-bottom: 16px;padding-top: 16px; margin-bottom: 0px;">
        <div id="gridHistorial" data-bind="dxDataGrid: gridHistorial"></div>
    </div>
    <div class="" style="display: none;">
        <div id="gridLectura" data-bind="dxDataGrid: gridLectura"></div>
    </div>
    <div id="nodoPopup" class="nodoPopup"></div>
</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Reportes/historial.js"></script>
    <script>
        ko.applyBindings(new Reportes.HistorialIndexViewModel());
    </script>
End Section
