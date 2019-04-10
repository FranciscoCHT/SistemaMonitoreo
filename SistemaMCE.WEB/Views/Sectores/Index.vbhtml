@Code
    ViewData("Title") = "Index"
End Code

<section class="content-header">
    <h1>
        <span style="text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Gestión de sectores</span>
        <small>Lista de sectores en el sistema y creación de éstos.</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="/home"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Sectores</li>
    </ol>
</section>

<link rel="dx-theme" data-theme="generic.greenmist" href="https://cdn3.devexpress.com/jslib/18.2.5/css/dx.greenmist.css" />

<div id="cuerpo" style="margin-bottom:70px" class="dx-fieldset">

    <div class="dx-field" style="display: none;">
        <div id="form-sectores" data-bind="dxForm: formOptions"></div>
    </div>

    <div class="dx-field" style="width: 80%;margin: 10px auto;">
        <div id="botonesDetalle" class="btn-group" role="group" style="float:right;">
            <div id="botonOpt" data-bind="dxButton: modifPopup"></div>
            <div id="botonOpt" data-bind="dxButton: buttonOptionsDelete"></div>
        </div>
        <div id="botonesDetalle" class="btn-group" role="group">
            <div id="botonCrear" data-bind="dxButton: addPopup"></div>
        </div>
    </div>

    <div class="dx-field">
        <div id="grid-sectores" style="margin: 0 auto;" data-bind="dxDataGrid: dataGridOptions"></div>
    </div>

    <div id="form-popup" data-bind="dxPopup: formPopup"></div>
</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Sectores/sectores.js"></script>
    <script>
        ko.applyBindings(new Sectores.SectoresIndexViewModel());
    </script>
End Section