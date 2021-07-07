"use strict";

const metaDom = {
    meta: document.getElementById("metaCollapserContent"),
    layer: document.getElementById("collapserContent")
};

function updateAllDom() {
    const metaTab = game.playerWatching.isMeta;

    Object.values(metaDom).map((e, i) => e.style.display = metaTab == i?"none":"");

    if (metaTab == false) {
        updateLayer(_layer);
    } else {
        if (game.playerWatching.isMetaUpgrade) updateMetaUpgrade();
        updateAllMetaCollapser();
    }
    updateProgress(_layer);
    updateEffect(_layer);
}
