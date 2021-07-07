"use strict";

let _layer = null, _tier = null;;
function enterLayer(tier, experiment) {
    game.playerWatching.isMeta = false;
    game.playerWatching.tier = tier;
    game.playerWatching.experiement = experiment;
    game.playerWatching.layerTab = 0;

    _tier = game.tiers[tier];
    _layer = game.tiers[tier].layers[experiment];
    initLayer(_layer);
}
function exitLayer() {
    game.playerWatching.isMeta = true;
    game.playerWatching.tier = null;
    game.playerWatching.experiement = null;

    _tier = null;
    _layer = null;
}

function enterMetaUpgrade(tier) {
    displayMetaUpgrade();
    game.playerWatching.isMetaUpgrade = true;
    game.playerWatching.tier = tier;
    _tier = game.tiers[tier];
}
function exitMetaUpgrade() {
    hideMetaUpgrade();
    game.playerWatching.isMetaUpgrade = false;
    game.playerWatching.tier = null;
    _tier = null;
}



let debugBool = new Array(10).fill(false);
function debugMode(n) {
    debugBool[n] ^= 1;
}
function debugWork() {
    for (let i = 0, l = debugBool.length; i < l; i++) {
        if (!debugBool[i]) continue;

        switch (i) {
            case 0:
                game.gameSpeed = 200;
                if (_layer) _layer.automation = [0, 1, 2, 3, 4];
                break;
        }
    }
}