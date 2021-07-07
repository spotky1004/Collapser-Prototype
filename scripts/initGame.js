"use strict";

load();

initMetaUpgradeUi();
initGame();

function initGame() {
    if (!game.playerWatching.isMeta) {
        enterLayer(game.playerWatching.tier, game.playerWatching.experiement);
    } else if (game.playerWatching.isMeta && game.playerWatching.isMetaUpgrade) {
        enterMetaUpgrade(game.playerWatching.tier);
    }
    
    canvasInit();
    
    updateAllMetaCollapser();
}