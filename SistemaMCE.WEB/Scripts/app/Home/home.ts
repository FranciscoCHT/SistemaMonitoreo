/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />

namespace Home {
    'use strict'
    export class HomeIndexViewModel {

        constructor() {
            if (window.localStorage.getItem("user") === null) {
                window.location.replace(window.location.origin + '/Login');
            }
        }

    }
}