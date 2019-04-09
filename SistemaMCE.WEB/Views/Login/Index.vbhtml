@Code
    ViewData("Title") = "Index"
    Layout = ""
End Code
@Scripts.Render("~/bundles/jquery")
@Scripts.Render("~/bundles/bootstrap")
@Scripts.Render("~/bundles/knockout")
@Scripts.Render("~/bundles/devextreme")
@Scripts.Render("~/admin-lte/js")
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
            <img src="kodinger.jpg" alt="logo">
        </div>
        <div class="lowin-wrapper">
            <div class="lowin-box lowin-login">
                <div class="lowin-box-inner">
                    <form>
                        <p>Sign in to continue</p>
                        <div class="lowin-group">
                            <label>Email <a href="#" class="login-back-link">Sign in?</a></label>
                            <input type="email" autocomplete="email" name="email" class="lowin-input">
                        </div>
                        <div class="lowin-group password-group">
                            <label>Password <a href="#" class="forgot-link">Forgot Password?</a></label>
                            <input type="password" name="password" autocomplete="current-password" class="lowin-input">
                        </div>
                        <button class="lowin-btn login-btn">
                            Sign In
                        </button>

                        <div class="text-foot">
                            Don't have an account? <a href="" class="register-link">Register</a>
                        </div>
                    </form>
                </div>
            </div>

            <div class="lowin-box lowin-register">
                <div class="lowin-box-inner">
                    <form>
                        <p>Let's create your account</p>
                        <div class="lowin-group">
                            <label>Name</label>
                            <input type="text" name="name" autocomplete="name" class="lowin-input">
                        </div>
                        <div class="lowin-group">
                            <label>Email</label>
                            <input type="email" autocomplete="email" name="email" class="lowin-input">
                        </div>
                        <div class="lowin-group">
                            <label>Password</label>
                            <input type="password" name="password" autocomplete="current-password" class="lowin-input">
                        </div>
                        <button class="lowin-btn">
                            Sign Up
                        </button>

                        <div class="text-foot">
                            Already have an account? <a href="" class="login-link">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <footer class="lowin-footer">
            Design By <a href="http://fb.me/itskodinger">itskodinger</a>
        </footer>
    </div>

    <script src="~/Scripts/customScripts/loginauth.js"></script>
    <script>
        Auth.init({
            login_url: '#login',
            forgot_url: '#forgot'
        });
    </script>

</body>
</html>

<script type="text/javascript" src="~/Scripts/app/Login/login.js"></script>
<script>
    ko.applyBindings(new Login.LoginIndexViewModel());
</script>
