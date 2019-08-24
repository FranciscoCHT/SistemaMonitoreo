@Code
    ViewData("Title") = "Index"
End Code

<section class="content-header" style="border-bottom: 1px solid #000;padding-bottom: 10px; margin-left:10px;margin-right: 10px;">
    <h1>
        <span style="text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Configuración de sistema</span>
        <small>Interfaz para poder modificar variables del sistema.</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="/Home"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Configuración</li>
    </ol>
</section>

<link rel="dx-theme" data-theme="generic.greenmist" href="https://cdn3.devexpress.com/jslib/18.2.5/css/dx.greenmist.css" />

<div id="cuerpo" style="margin-bottom:0px; margin-top:0px;" class="dx-fieldset">
    <div class="" style="-webkit-column-count: 1;-webkit-column-width: 100px;-webkit-column-gap: 4em;-webkit-column-rule: 1px dotted #ddd;padding-top: 20px;">
        <div class="dx-form-group-caption" style="color: #f00;font-size:16px;text-align:center"><b>¡CUIDADO!</b></div>
        <div class="dx-form-group-caption" style="color: #f00;font-size:16px;text-align:center"><b>MODIFICAR ESTOS VALORES PUEDE CAUSAR QUE</b></div>
        <div class="dx-form-group-caption" style="color: #f00;font-size:16px;text-align:center;padding-bottom: 20px;"><b>EL SISTEMA NO FUNCIONE CORRECTAMENTE.</b></div>
        <div id="formConf" data-bind="dxForm: formConf" style="padding-bottom:30px; margin: 0 auto;text-align:center"></div>
    </div>

    <div style="-webkit-column-count: 1;-webkit-column-width: 130px; margin-bottom:10px;text-align:center;">
        <div id="onButton" data-bind="dxButton: onButton"></div>
    </div>

</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Home/config.js"></script>
    <script>
            ko.applyBindings(new Home.ConfigIndexViewModel());
    </script>
End Section