"use strict";

function metaClick(el) {
    let dataSet = el.dataset;
    switch (el.classList.value.split(" ")[0]) {
        case "mCollapserExperiment": case "mCollapserExperimentIdx": case "mCollapserExperimentInfo":
            if (el.parentElement.matches(".mCollapserExperiment")) {
                el = el.parentElement;
                dataSet = el.dataset;
            }
            const layerIdx = Object.keys(game.tiers[dataSet.tier].layers)[dataSet.idx];
            enterLayer(dataSet.tier, layerIdx);
            break;
        case "mCollapserResource": case "mCollapserResourceCount": case "mCollapserResourceUnit": case "mCollapserResourceName":
            if (el.parentElement.matches(".mCollapserResource")) {
                el = el.parentElement;
                dataSet = el.dataset;
            }
            enterMetaUpgrade(dataSet.idx);
            break;
    }
}
