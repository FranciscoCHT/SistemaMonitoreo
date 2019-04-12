/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Login {
    'use strict'
    export class LoginIndexViewModel {

        public usuario: KnockoutObservableArray<any> = ko.observableArray<any>();
        public loading: KnockoutObservable<boolean> = ko.observable<boolean>(false);

        PostLogin(): void {
            let userBox: any = $("#textbox-user").dxTextBox('instance').option('value');
            let passBox: any = $("#textbox-pass").dxTextBox('instance').option('value');
            let url = 'api/login';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    ID: 0,
                    User: userBox,
                    Pass: passBox
                }
            }).done((data: any) => {
                    window.localStorage.setItem('user', data.User);
                    window.localStorage.setItem('nombre', data.NombreCompleto);
                    window.localStorage.setItem('pass', data.Pass);
                    window.location.replace(window.location.origin + '/Home');
            }).fail((data: any) => {
                    this.loading(false);
                    DevExpress.ui.notify(data.responseJSON, "error", 3000);
            });
        }

        buttonOptionsLogin: DevExpress.ui.dxButtonOptions = {
            text: "Iniciar sesión",
            icon: "key",
            width: '100%',
            onClick: () => {
                this.loading(true);
                this.PostLogin();
            }
        }

        userBoxOptions: any = {
            showClearButton: false,
            stylingMode: "underlined"
        }

        passBoxOptions: any = {
            showClearButton: false,
            mode: "password",
            stylingMode: "underlined"
        }

        constructor() {
            if (window.localStorage.getItem("user") !== null) {
                window.location.replace(window.location.origin + '/Home');
            }
        }

    }
}