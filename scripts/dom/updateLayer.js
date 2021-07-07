"use strict";

let layerDom = {};
layerDom.layer = document.getElementById("collapserContent");
layerDom.exit = document.getElementById("exitExperiment");
layerDom.experimentNr = document.getElementById("experimentNr");
layerDom.topNav = [...document.getElementById("innerContentsNav").children];
layerDom.tab = [...document.getElementById("innerContentsTabs").children];
layerDom.helpTxt = layerDom.layer.getElementsByClassName("helpTxt")[0];

layerDom.energy = document.getElementById("energyDisplay");
layerDom.energyProduction = document.getElementById("energyGainDisplay");
layerDom.upgrade = [...document.getElementsByClassName("upgrade")];
layerDom.upgradeInfo = [...document.getElementsByClassName("upgradeInfo")];
layerDom.upgradeInnerInfo = layerDom.upgradeInfo.map(e => e = {name: e.children[0], level: e.children[1]});
layerDom.upgradeEffect = [...document.getElementsByClassName("upgradeEffects")];
layerDom.upgradeInnerEffect = layerDom.upgradeEffect.map(e => e = {now: e.children[0], after: e.children[1]});
layerDom.upgradeCost = [...layerDom.upgrade.map(e => e.getElementsByClassName("upgradeBtn")[0])];

layerDom.collapserFactor = [...document.getElementById("collapserFactors").children];
layerDom.collapserUpgrade = [...document.getElementById("collapserUpgrades").children];
layerDom.collapserModule = [...document.getElementById("collapserModules").children];
layerDom.collapserModuleInfo = layerDom.collapserModule.map(e => e.children[1]);
layerDom.collapserModuleCost = layerDom.collapserModule.map(e => e.children[2].children[0]);

layerDom.automation = [...document.getElementsByClassName("automationWarp")].map(e => e = {name: e.children[0], cost: e.children[1]});

Object.freeze(layerDom);



function initLayer(layer) {
    for (let i = 0, l = layer.upgrades.length; i < 3; i++) {
        if (i < l) {
            layerDom.upgrade[i].style.display = ""; // reset to default (flex)
            layerDom.upgradeInnerInfo[i].name.innerText = upgradeTypes[layer.upgradeTypes[i]].name;
        } else {
            layerDom.upgrade[i].style.display = "none";
        }
    }
    for (let i = 0, l = collapserModlueCost.length; i < l; i++) {
        layerDom.collapserModuleCost[i].innerText = notation(collapserModlueCost[i], 2, 0);
    }
    for (let i = 0, l = layerDom.automation.length; i < l; i++) {
        layerDom.automation[i].name.innerText = automationsDatas[i].name;
        layerDom.automation[i].cost.innerText = notation(automationsDatas[i].cost) + " J";
    }

    layerDom.exit.style.display = game.tiers[0].experimentCount.gte(2) ? "" : "none";

    midUpdateLayer(layer);
}

function midUpdateLayer(layer) {
    layerDom.tab.map(e => e.style.display = "none");
    layerDom.tab[game.playerWatching.layerTab].style.display = "";

    updateLayer(layer);
} // changeables

function updateLayer(layer) {
    const speedMult = layer.parent().getCollapse(1);

    layerDom.energy.innerText = notation(layer.j, 4, 2, 1) + " J";
    layerDom.energyProduction.innerText = `+ ${notation(layer.getProduction().mul(speedMult), 4, 2)} J/s`;
    layerDom.experimentNr.innerText = `Experiment #${layer.idx} (${layer.getData().name})`;

    layerDom.topNav[1].style.display = layer.totalJ.lt(1e10)?"none":"";
    layerDom.topNav[2].style.display = layer.totalJ.lt(1e100)?"none":"";

    layerDom.helpTxt.style.display = game.milestone >= 1 ? "" : "none";

    switch (game.playerWatching.layerTab) {
        case 0:
            for (let i = 0, l = layer.upgrades.length; i < l; i++) {
                const tmpUpgrade = layer.upgrades[i];
                layerDom.upgradeInnerInfo[i].level.innerText = "Lv " + notation(tmpUpgrade.level);
                layerDom.upgradeInnerEffect[i].now.innerText = notation(tmpUpgrade.calcEffect(), 2, 2);
                layerDom.upgradeInnerEffect[i].after.innerText = notation(tmpUpgrade.calcEffect(tmpUpgrade.level.add(1)), 2, 2);
        
                const cost = tmpUpgrade.calcCost();
                layerDom.upgradeCost[i].innerText = notation(cost, 2, 1) + " J";
                layerDom.upgradeCost[i].classList[layer.j.lt(cost) ? "add" : "remove"]("disabled");
            }
            break;
        case 1:
            for (let i = 0, l = layer.collapsers.length; i < l; i++) {
                layerDom.collapserFactor[i].innerText = notation(layer.collapse[!i ? "mul" : "pow"], 2, 3);
                layerDom.collapserFactor[i].setAttribute("speed", notation(layer.collapsers[i].calcEffect()[!i ? "pow" : "mul"](speedMult), 2, 2));
                const tmpCost = layer.collapsers[i].calcCost();
                layerDom.collapserUpgrade[i].innerText = notation(tmpCost, 4);
                layerDom.collapserUpgrade[i].classList[layer.j.lt(tmpCost) ? "add" : "remove"]("disabled");
            }
            for (let i = 0, l = layerDom.collapserModule.length; i < l; i++) {
                layerDom.collapserModule[i].classList[layer.collapserModule.includes(i) ? "add" : "remove"]("bought");
                let moduleEffect = layer.getCollapse(i, true);
                if (i === 2) moduleEffect = moduleEffect.mul(moduleEffect);
                layerDom.collapserModuleInfo[i].innerText = collapserModulePrefix[i].replace("x", notation(moduleEffect, 4, 2));
                layerDom.collapserModuleCost[i].classList[layer.j.lt(collapserModlueCost[i]) ? "add" : "remove"]("disabled");
            }
            break;
        case 2:
            for (let i = 0, l = layerDom.automation.length; i < l; i++) {
                layerDom.automation[i].cost.style.display = layer.automation.includes(i) ? "none": "";
                layerDom.automation[i].cost.classList[layer.j.lt(automationsDatas[i].cost) ?"add" : "remove"]("disabled");
            }
            break;
    }
}
