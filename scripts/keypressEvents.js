"use strict";

let keyPressed = {};

document.addEventListener("keydown", function(e) {
    keyPressed[e.key] = true;
});
document.addEventListener("keyup", function (e) {
    keyPressed[e.key] = false;
});

let holdKey = null;
function keyOverlayTouchStart(el) {
    if (el.parentElement.matches("#keyOverlay")) {
        let key = el.getAttribute("key");
        holdKey = key;
        keyPressed[key] = true;
    }
}
function keyOverlayTouchEnd() {
    if (holdKey !== null) {
        keyPressed[holdKey] = false;
        holdKey = null
    }
}

function keypressEvents() {
    if (keyPressed["Escape"]) {
        if (game.playerWatching.isMetaUpgrade) {
            exitMetaUpgrade();
        } else if (!game.playerWatching.isMeta && game.milestone >= 1) {
            exitLayer();
        }
    }
    if (keyPressed["u"]) {
        if (game.milestone >= 1 && !game.playerWatching.isMeta) {
            switch (game.playerWatching.layerTab) {
                case 0:
                    for (let i = 0, l = _layer.upgrades.length; i < l; i++) {
                        _layer.upgrades[i].buy();
                    }
                    break;
                case 1:
                    for (let i = 0, l = _layer.collapsers.length; i < l; i++) {
                        _layer.collapsers[i].buy();
                    }
                    for (let i = 0; i < 3; i++) {
                        _layer.buyCollapserModule(i);
                    }
                    break;
                case 2:
                    for (let i = 0; i < 5; i++) {
                        _layer.buyAutomation(i);
                    }
                    break;
            }
        }
    }
    if (keyPressed["1"]) {
        if (!game.playerWatching.isMeta && game.playerWatching.layerTab !== 0) {
            game.playerWatching.layerTab = 0;
            midUpdateLayer(_layer);
        }
    }
    if (keyPressed["2"]) {
        if (!game.playerWatching.isMeta && game.playerWatching.layerTab !== 1) {
            game.playerWatching.layerTab = 1;
            midUpdateLayer(_layer);
        }
    }
    if (keyPressed["3"]) {
        if (!game.playerWatching.isMeta && game.playerWatching.layerTab !== 2) {
            game.playerWatching.layerTab = 2;
            midUpdateLayer(_layer);
        }
    }
}
