"use strict";

// divice check
let isDivicePc;
let pc_device = "win16|win32|win64|mac|macintel";
let this_device = navigator.platform;

if ( this_device ) {
    if ( pc_device.indexOf(navigator.platform.toLowerCase()) < 0 ) {
        isDivicePc = false;
    } else {
        isDivicePc = true;
    }
}