@Code
    ViewData("Title") = "Index"
    Layout = ""
End Code
@Scripts.Render("~/bundles/jquery")
@Scripts.Render("~/bundles/bootstrap")
@Scripts.Render("~/bundles/knockout")
@Scripts.Render("~/bundles/devextreme")
@Scripts.Render("~/bundles/app")

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Lowin</title>
    <link rel="stylesheet" href="~/Content/customCSS/loginauth.css">
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")
    <!-- Font Awesome -->
    <link rel="stylesheet" href="~/Content/font-awesome.min.css">
    <!-- Ionicons -->
    @*<link rel="stylesheet" href="~/Content/Ionicons/css/ionicons.min.css">*@
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body>
    <div class="lowin lowin-red">
        <div class="lowin-brand">
            <img src="~/dist/img/kodinger.jpg" alt="logo">
        </div>
        <div class="lowin-wrapper">
            <div class="lowin-box lowin-login">
                <div class="lowin-box-inner">
                    <form>
                        <p>Inicie sesión para continuar</p>
                        <div class="lowin-group">
                            <label>Usuario <a href="#" class="login-back-link">Iniciar sesión?</a></label>
                            <div id="textbox-user" class="lowin-input" data-bind="dxTextBox: userBoxOptions"></div>
                        </div>
                        <div class="lowin-group">
                            <label>Contraseña</label>
                            <div id="textbox-pass" class="lowin-input" data-bind="dxTextBox: passBoxOptions"></div>
                        </div>
                        <div class="lowin-btn login-btn" style="margin-top: 10px" data-bind="dxButton: buttonOptionsLogin"></div>
                    </form>
                </div>
            </div>
        </div>

        <div data-bind="dxLoadPanel: { visible: loading, message: 'Cargando . . .' }"></div>

        <footer class="lowin-footer">
            Design By <a href="http://fb.me/itskodinger">itskodinger</a>
        </footer>
    </div>

</body>
</html>

<script type="text/javascript" src="~/Scripts/app/Login/login.js"></script>
<script>
    ko.applyBindings(new Login.LoginIndexViewModel());
</script>
