@Code
    ViewData("Title") = "ConsumoActual"
End Code

<section class="content-header">
    <h1>
        <span style="text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Consumo actual</span>
        <small>Consumo actual de cada nodo del usuario a cargo.</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="/Home"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li>Nodos</li>
        <li class="active">Consumo actual</li>
    </ol>
</section>

<link rel="dx-theme" data-theme="generic.greenmist" href="https://cdn3.devexpress.com/jslib/18.2.5/css/dx.greenmist.css" />

<div id="cuerpo" style="margin-bottom:70px" class="dx-fieldset">

</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Nodos/nodoactual.js"></script>
    <script>
        ko.applyBindings(new Nodos.NodoActualIndexViewModel());
    </script>
End Section