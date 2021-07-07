"use strict";

const savePoint = "CollapserProto";

const tempGame = {
    tiers: {
        0: {
            layers: [
                {
                    idx: 0,
                    j: 0,
                    totalJ: 0,
                    upgrades: [0, 0],
                    collapse: {
                        div: 1,
                        pow: 1
                    },
                    collapsers: [0, 0],
                    collapserModule: [],
                    milestone: 0,
                }
            ],
            infinity: 0,
            collapsedInfinity: 0,
            collapsers: [0, 0],
            experimentCount: 1,
        },
    },
    
    milestone: 0,
    
    playerWatching: {
        isMeta: false,
        isMetaUpgrade: false,
        tier: 0,
        experiement: 0,
        layerTab: 0
    },

    lastTick: new Date().getTime(),

    gameSpeed: 1,
};

let game = {};

function save() {
    let saveData = Spdl.copyObj(game);

    saveData.tiers = {};

    // fix saveData.tiers
    for (const t in game.tiers) {
        const tier = game.tiers[t];
        let tmp = saveData.tiers[t] = {};
        tmp.infinity = tier.infinity;
        tmp.collapse = {...tier.collapse};
        tmp.collapsers = [];
        for (let i = 0, l = tier.collapsers.length; i < l; i++) tmp.collapsers.push(tier.collapsers[i].level);
        delete saveData.tiers[t].tier;
    }

    // fix saveData.tiers.layers
    for (const t in game.tiers) {
        let tmpTier = game.tiers[t];
        saveData.tiers[t].layers = [];
        for (let l = 0, length = tmpTier.layers.length; l < length; l++) {
            saveData.tiers[t].experimentCount = tmpTier.experimentCount;
            let tmp = saveData.tiers[t].layers[l] = {}; // saveData.tiers[t].layers[l] -> obj -> tmp (shallow copy)
            tmp.upgrades = [];
            const tmpTrans = tmpTier.layers[l];
            for (let i = 0, l = tmpTrans.upgrades.length; i < l; i++) tmp.upgrades.push(tmpTrans.upgrades[i].level);
            tmp.collapse = {...tmpTrans.collapse};
            tmp.j = tmpTrans.j;
            tmp.totalJ = tmpTrans.totalJ;
            tmp.collapsers = [];
            for (let i = 0, l = tmpTrans.collapsers.length; i < l; i++) tmp.collapsers.push(tmpTrans.collapsers[i].level);
            tmp.collapserModule = tmpTrans.collapserModule;
            tmp.automation = tmpTrans.automation;
            tmp.milestone = tmpTrans.milestone;
            tmp.idx = tmpTrans.idx;
        }
    }

    localStorage[savePoint] = JSON.stringify(saveData);

    return JSON.stringify(saveData);
}

function load() {
    game = {...Spdl.copyObj(tempGame), ...JSON.parse(localStorage[savePoint] ?? "{}")};

    for (const t in game.tiers) {
        game.tiers[t] = new Tier({tier: t, ...game.tiers[t]});
    }
}

function exportGame() {
    console.log(btoa(save()));
}
function importGame(str) {
    localStorage[savePoint] = atob(str);
    load();
    initGame();
}

function hardReset() {
    delete localStorage[savePoint];
    load();
    initGame();
}