"use strict";

let windowBlured = false;

window.onblur = function () {
    keyPressed = {};
    windowBlured = true;
}

window.onfocus = function () {
    windowBlured = false;
}