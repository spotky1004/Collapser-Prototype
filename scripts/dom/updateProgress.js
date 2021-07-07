"use strict";

let titleUpdated = -10000;
const progressDom = {};
progressDom.title = document.getElementById("innerTopContent");
progressDom.bar = document.getElementById("bottomProgress");
progressDom.txt = progressDom.bar.children[0];

function updateProgress(layer) {
    // milestone
    const isMeta = game.playerWatching.isMeta;
    const milestone = !isMeta ? leyerDatas[layer.tier].milestones[layer.milestone] : metaMilestone[game.milestone];

    let progress;
    switch (milestone.type) {
        // layer
        case "energy":
            progress = D.max(layer.totalJ, 1).log(10).div(new D(milestone.goal).log(10)).toNumber();
            break;

        // meta
        case "experiment":
            const tmp = game.tiers[milestone.tier];
            progress = (tmp.experimentCount-Object.keys(tmp.layers).length)/milestone.goal;
            break;

        default:
            progress = 0;
            break;
    }

    progress *= 100;
    progress = Math.min(100, progress);

    progressDom.bar.style.setProperty("--progress", progress+"%");

    progressDom.txt.innerText = `${progress.toFixed(2)}% - ${milestone.name}`;

    if (progress >= 100) {
        if (isMeta) game.milestone = Math.min(game.milestone+1, metaMilestone.length-1);
        else layer.milestone = Math.min(layer.milestone+1, leyerDatas[layer.tier].milestones.length-1);
    } 

    // title
    if (performance.now() - titleUpdated >= 10000) {
        titleUpdated = performance.now();
        const mTitle = metaMilestone[game.milestone].title;
        progressDom.title.innerText = mTitle[Math.floor(Math.random()*mTitle.length)];
    }
}
