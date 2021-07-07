"use strict";

document.addEventListener("click", (e) => {
    metaClick(e.target);
});


if (isDivicePc) {
    document.addEventListener("mousedown", (e) => {
        keyOverlayTouchStart(e.target);
    });
    document.addEventListener("mouseup", (e) => {
        keyOverlayTouchEnd();
    });
} else {
    document.addEventListener("touchstart", (e) => {
        keyOverlayTouchStart(e.target);
    });
    document.addEventListener("touchend", (e) => {
        keyOverlayTouchEnd();
    });
}