"use strict";

let metaUpgradeDom = {};
metaUpgradeDom.main = document.getElementById("mCollapserUpgradeContent");
metaUpgradeDom.collapseCircle = document.getElementById("mCollapserUpgradeCollapseCircle");
metaUpgradeDom.cricleBg = document.getElementById("mCollapserUpgradeBgCircle");
metaUpgradeDom.percentCircles = document.getElementById("mCollapserPercentCircles");
metaUpgradeDom.percentCircleList = [];

metaUpgradeDom.infinity = document.getElementById("infinityDisplay");
metaUpgradeDom.collpaserFactor = [...document.getElementsByClassName("mCollapserFactor")];
metaUpgradeDom.collapserUpgrade = [...document.getElementsByClassName("mCollapserUpgrade")];
metaUpgradeDom.collapserEffect = [...document.getElementsByClassName("mCollapserEffectNum")];



function initMetaUpgradeUi() {
    for (let i = 0; i < 10; i++) {
        let circle = document.createElement("div");
        circle.classList.add("mCollapserUpgradeCircle");
        circle.innerText = (i+1)*10 + "%";
        metaUpgradeDom.percentCircles.append(circle);
        metaUpgradeDom.percentCircleList.push(circle);
    }
}



function displayMetaUpgrade() {
    metaUpgradeDom.main.style.pointerEvents = "";
    metaUpgradeDom.main.style.opacity = 1;
}
function hideMetaUpgrade() {
    metaUpgradeDom.main.style.pointerEvents = "none";
    metaUpgradeDom.main.style.opacity = 0;
}



function updateMetaUpgrade() {
    const collapseCircle = metaUpgradeDom.collapseCircle;
    let milestonePer = _tier.calcInfninityCollapsePercent();



    // game
    metaUpgradeDom.infinity.innerHTML = notation(_tier.infinity);
    for (let i of [0, 1]) {
        const cost = _tier.collapsers[i].calcCost().floor(0);
        metaUpgradeDom.collpaserFactor[i].innerHTML = notation(_tier.collapse[!i?"mul":"pow"], 2, 3);
        metaUpgradeDom.collpaserFactor[i].setAttribute("speed", notation(_tier.collapsers[i].calcEffect(), 2, 3));
        metaUpgradeDom.collapserUpgrade[i].innerHTML = notation(cost);
        metaUpgradeDom.collapserUpgrade[i].classList[cost.gt(_tier.infinity)?"add":"remove"]("disabled");
    }
    for (let i of [0, 1]) {
        metaUpgradeDom.collapserEffect[i].innerHTML = notation(_tier.getCollapse(i), 4, 2);
    }
    collapseCircle.innerText = notation(milestonePer*100, 3, 2);


    
    // style
    const layout = innerWidth > innerHeight ? 1 : 0;

    collapseCircle.classList[milestonePer>1?"add":"remove"]("activate");

    let circleAttr = {
        x: collapseCircle.offsetLeft,
        y: collapseCircle.offsetTop,
        start: collapseCircle.offsetWidth,
        acc: layout ? (innerWidth - collapseCircle.offsetWidth) : (innerHeight - collapseCircle.offsetWidth),
        div: layout ? 13 : 16
    };

    if (layout) {
        collapseCircle.style.top  = "";
        collapseCircle.style.left = "";
    } else {
        collapseCircle.style.top  = "10vh";
        collapseCircle.style.left = "calc(50% - var(--s) / 2)" 
    }

    for (let i = 0; i < 10; i++) {
        const circle = metaUpgradeDom.percentCircleList[i];
        const totAcc = (i+1)*circleAttr.acc/circleAttr.div;

        circle.style.left = (circleAttr.x-totAcc) + "px";
        circle.style.top  = (circleAttr.y-totAcc) + "px";
        circle.style.setProperty("--s", (circleAttr.start + totAcc*2) + "px");
        
        if (layout) {
            circle.style.alignItems = "";
            circle.style.justifyContent = "";
        } else {
            circle.style.alignItems = "flex-end";
            circle.style.justifyContent = "space-around";
        }
    }

    const mainCircle = metaUpgradeDom.cricleBg;
    const mainCircleAcc = Math.min( (layout ? innerWidth : innerHeight)*2, circleAttr.acc/circleAttr.div*milestonePer*20);
    const mainCircleAni = ((sessionTime/2500*Math.min(3, milestonePer + 0.2))%1)*100;
    mainCircle.style.left = (circleAttr.x - mainCircleAcc/2) + "px";
    mainCircle.style.top  = (circleAttr.y - mainCircleAcc/2) + "px";
    mainCircle.style.setProperty("--s", (circleAttr.start + mainCircleAcc) + "px");
    mainCircle.style.background = `radial-gradient(
        circle,
        #ebbe3f ${mainCircleAni-8}%,
        #d6ae3c ${mainCircleAni*1.05-4}%,
        #ebbe3f ${mainCircleAni*1.1}%,
        #ebbe3f 100%
    )`;
}