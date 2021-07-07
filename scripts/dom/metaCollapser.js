"use strict";

let metaCollapserDom = {};
metaCollapserDom.mCollapsers = document.getElementById("mCollapsers");

function generateMetaCollapser(tier) {
    if (metaCollapserDom[tier]) return; // return if it already exists

    const data = leyerDatas[tier];

    /* child of mCollapsers */
    let warp = document.createElement("div");
    warp.style.order = tier;
    warp.classList.add("mCollapser");
    metaCollapserDom.mCollapsers.append(warp);


    /* mCollapser */
    let resource = document.createElement("div");
    resource.classList.add("mCollapserResource");
    resource.dataset.idx = tier;
    warp.append(resource);

    let experimentsWarp = document.createElement("div");
    experimentsWarp.classList.add("mCollapserExperimentsWarp");
    warp.append(experimentsWarp);


    /* mCollapserResource */
    let resCount = document.createElement("span");
    resCount.classList.add("mCollapserResourceCount");
    resCount.innerText = notation(0);
    resource.append(resCount);
    
    let resUnit = document.createElement("span");
    resUnit.classList.add("mCollapserResourceUnit");
    resUnit.innerHTML = ` &infin;J`;
    resource.append(resUnit);

    let resName = document.createElement("sub");
    resName.classList.add("mCollapserResourceName");
    resName.innerText = data.name;
    resource.append(resName);


    /* mCollapserExperimentsWarp */
    let collapserName = document.createElement("span");
    collapserName.classList.add("mCollapserNamespace");
    collapserName.innerHTML = data.name;
    experimentsWarp.append(collapserName);

    let experiments = document.createElement("span");
    experiments.classList.add("mCollapserExperiments");
    experimentsWarp.append(experiments);


    /* mCollapserExperiments */
    let tmpExperiment = [];
    for (let i = 0; i < 4; i++) {
        let experiment = document.createElement("span");
        experiment.classList.add("mCollapserExperiment");
        experiment.dataset.tier = tier;
        experiment.dataset.idx = i;
        experiments.append(experiment);

        /* mCollapserExperiment */
        let experimentIdx = document.createElement("div");
        experimentIdx.classList.add("mCollapserExperimentIdx");
        experimentIdx.innerText = "Experiment #0";
        experiment.append(experimentIdx);

        let experimentInfo = document.createElement("div");
        experimentInfo.classList.add("mCollapserExperimentInfo");
        experimentInfo.innerText = "0 J";
        experiment.append(experimentInfo);


        tmpExperiment.push({warp: experiment, idx: experimentIdx, info: experimentInfo});
    }


    /* set cache */
    metaCollapserDom[tier] = {
        warp: warp,
        resourceWarp: resource,
        resource: resCount,
        experiment: tmpExperiment,
    };
}

function updateMetaCollapser(tier) {
    const tierDom = metaCollapserDom[tier];
    const _tier = game.tiers[tier];
    if (!tierDom) return; // return if it isn't exists

    tierDom.warp.style.display = game.tiers[tier] ? "" : "none";
    if (!game.tiers[tier]) return;

    tierDom.resourceWarp.classList[_tier.canInfCollapse()>=1 ? "add" : "remove"]("activate");
    
    tierDom.resource.innerText = notation(game.tiers[tier].infinity, 5, 0);
    const tierLayers = game.tiers[tier].layers
    tierDom.experiment.map((e, i) => {
        e.warp.style.display = i < tierLayers.length ? "" : "none";
        if (tierLayers.length <= i) return;
        e.idx.innerText = `Experiment #${notation(tierLayers[i].idx)}`;
        e.info.innerText = `${notation(tierLayers[i].j, 2, 0)} J`;
    })
}
function updateAllMetaCollapser() {
    for (let i = 0, l = Object.keys(metaCollapserDom).length-1; i < l; i++) updateMetaCollapser(i);
}

for (let i = 0; i <= 6; i++) generateMetaCollapser(i);