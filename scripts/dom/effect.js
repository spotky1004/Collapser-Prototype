"use strict";

let effect = {};
effect.dom = document.getElementById("screenEffects");
effect.width = effect.dom.offsetWidth;
effect.height = effect.dom.offsetHeight;
effect.canvas = document.getElementById("effectCanvas");
effect.ctx = effect.canvas.getContext("2d");

function updateEffect() {
    if (game.playerWatching.isMeta) {
        effect.dom.style.display = "none";
        return;
    }
    effect.dom.style.display = "";
    let colIdx;
    for (let i = 0, l = shadowColor.length; i < l; i++) {
        if (shadowColor[i].energy.gt(_layer.totalJ)) {
            colIdx = i;
            break;
        }
    }
    let shadowColors = [shadowColor[colIdx], shadowColor[colIdx-1]];
    let p = _layer.totalJ.log(10).div(shadowColors[0].energy.add(1).log(10).sub(shadowColors[1].energy.add(1).log(10))).toNumber();
    let col = shadowColors[0].color.map((e, i) => Math.floor(e*p + shadowColors[1].color[i]*(1-p)));
    effect.dom.style.setProperty("--shadowCol", `rgb(${col.join(", ")})`);
}

function canvasInit() {
    effect.canvas.width = effect.width;
    effect.canvas.height = effect.height;
}

window.onresize = () => {
    effect.width = effect.dom.offsetWidth;
    effect.height = effect.dom.offsetHeight;
    canvasInit();
};