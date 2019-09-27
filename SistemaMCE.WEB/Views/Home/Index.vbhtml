@Code
    ViewData("Title") = "Home Page"
End Code
<link href="https://fonts.googleapis.com/css?family=Open+Sans|Titillium+Web:300&display=swap" rel="stylesheet">
<div class="jumbotron" style="padding-top: 10px;padding-bottom:20px;margin:-15px;margin-bottom:10px;background-image: linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(../dist/img/2.png);background-size: cover;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);">
    <h1 style="font-family: 'Titillium Web', sans-serif;margin-top:20px;text-align:center;text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;">Sistema de Monitoreo<br />y Control del consumo eléctrico</h1>
    <p class="lead" style="font-family: 'Titillium Web', sans-serif;text-align:center;">Sistema que permite la monitorización de distintas áreas, mediante sensores,<br />que muestran la información en este panel de control.</p>
    <p style="text-align:center;"><a href="~/Nodos/ConsumoActual" class="btn btn-success btn-lg">Ir al monitoreo &raquo;</a></p>
</div>

<div class="row" style="padding: 50px; padding-top:0px;">
    <div class="col-md-4" style="padding-bottom: 30px;">
        <h2 style="text-align:center;font-family: 'Open Sans', sans-serif;text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;padding-bottom:10px;">Monitoreo Actual</h2>
        <p style="font-family: 'Titillium Web', sans-serif; letter-spacing:1px; font-weight:200; text-align:justify;padding-bottom:10px;">
            Interfaz que permite monitorizar las últimas lecturas de los nodos del sistema, así 
            como también los valores acumulados en el día, el consumo hecho en la última semana
            y mes, y el costo en ese mismo período.
        </p>
        <p style="text-align:center;"><a class="btn btn-pinterest" href="~/Nodos/ConsumoActual" style="text-align:center;">Ir a ... &raquo;</a></p>
    </div>
    <div class="col-md-4" style="padding-bottom: 30px;">
        <h2 style="text-align:center;font-family: 'Open Sans', sans-serif;text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;padding-bottom:10px;">Consumo Histórico</h2>
        <p style="font-family: 'Titillium Web', sans-serif; letter-spacing:1px; font-weight:200; text-align:justify;padding-bottom:10px;">
            Interfaz que permite mostrar lecturas en meses y años determinados, de manera de
            obtener una mayor información detallada de la fecha seleccionada, en todos o uno
            de los nodos seleccionados. Permite ver el detalle de las lecturas.
        </p>
        <p style="text-align:center;"><a class="btn btn-pinterest" href="~/Nodos/ConsumoHistorico">Ir a ... &raquo;</a></p>
    </div>
    <div class="col-md-4" style="padding-bottom: 0px;">
        <h2 style="text-align:center;font-family: 'Open Sans', sans-serif;text-shadow: 3px 3px 11px #a7a7a7; letter-spacing:1px;padding-bottom:10px;">Reporte Lecturas</h2>
        <p style="font-family: 'Titillium Web', sans-serif; letter-spacing:1px; font-weight:200; text-align:justify;padding-bottom:10px;">
            Esta interfaz permite exportar los datos de lectura en Excel, de manera de tener
            un reporte de datos y la fecha que fue tomada. Seleccione una fecha de
            inicio y término para mostrar los datos de todas las lecturas en el
            período, para todos o uno de los nodos.
        </p>
        <p style="text-align:center;"><a class="btn btn-pinterest" href="~/Reportes">Ir a ... &raquo;</a></p>
    </div>
</div>

@section scripts
    <script type="text/javascript" src="~/Scripts/app/Home/home.js"></script>
    <script>
        ko.applyBindings(new Home.HomeIndexViewModel());
    </script>
End Section