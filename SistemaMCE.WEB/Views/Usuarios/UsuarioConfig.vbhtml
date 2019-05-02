@Code
    ViewData("Title") = "UsuarioConfig"
End Code

<section class="content-header" style="border-bottom: 1px solid #000;padding-bottom: 10px; margin-left:10px;margin-right: 10px;">
    <h1>
        <span style="text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Configuración</span>
        <small>Formulario para editar los datos de la cuenta del usuario.</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="/Home"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Configuración</li>
    </ol>
</section>

<link rel="dx-theme" data-theme="generic.greenmist" href="https://cdn3.devexpress.com/jslib/18.2.5/css/dx.greenmist.css" />

<div id="cuerpo" style="margin-bottom:20px; margin-top:20px;" class="dx-fieldset">
    <span class="dx-form-group-caption" style="color: #6a828e;font-size:16px;"><b>Configuración de la cuenta del usuario</b></span>
    <div class="" style="-webkit-column-count: 1;-webkit-column-width: 100px;-webkit-column-gap: 4em;-webkit-column-rule: 1px dotted #ddd;border-top: 1px solid #7eb2be;padding-top: 30px;">
        <div id="formUser" data-bind="dxForm: formUser" style="padding-bottom:30px; margin: 0 auto;"></div>
        <div style="text-align:center">
            <div id="buttonSave" data-bind="dxButton: buttonSave"></div>
        </div>
    </div>
</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Usuarios/usuarioconf.js"></script>
    <script>
        ko.applyBindings(new Usuarios.UsuarioConfIndexViewModel());
    </script>
End Section