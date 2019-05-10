/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Login {
    'use strict'
    export class LoginIndexViewModel {

        public usuario: KnockoutObservableArray<any> = ko.observableArray<any>();
        public loading: KnockoutObservable<boolean> = ko.observable<boolean>(false);

        PostLogin(): void {
            var userBox: any;
            var passBox: any;
            if ((window.localStorage.getItem('user') != null && window.localStorage.getItem('user') != undefined) && (window.localStorage.getItem('pass') != null && window.localStorage.getItem('pass') != undefined) ) {
                userBox = window.localStorage.getItem('user');
                passBox = window.localStorage.getItem('pass');
            } else {
                userBox = $("#textbox-user").dxTextBox('instance').option('value');
                passBox = $("#textbox-pass").dxTextBox('instance').option('value');
            }
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
                    window.localStorage.removeItem('user');
                    window.localStorage.removeItem('nombre');
                    window.localStorage.removeItem('pass');
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
            stylingMode: "underlined",
            onEnterKey: (e) => {
                this.loading(true);
                this.PostLogin();
            }
        }

        passBoxOptions: any = {
            showClearButton: false,
            mode: "password",
            stylingMode: "underlined",
            onEnterKey: (e) => {
                this.loading(true);
                this.PostLogin();
            }
        }

        constructor() {
            //if (window.localStorage.getItem("user") != null) {
            //    window.location.replace(window.location.origin + '/Home');
            //}
            if ((window.localStorage.getItem('user') != null && window.localStorage.getItem('user') != undefined) && (window.localStorage.getItem('pass') != null && window.localStorage.getItem('pass') != undefined)) {
                this.PostLogin();
            }
        }

    }
}