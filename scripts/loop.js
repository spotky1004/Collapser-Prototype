"use strict";

let fpsMeter = document.getElementById("fpsDisplay");
let tickSpent = 0;
let sessionTime = 0;

function gameLoop() {
    sessionTime = performance.now();

    let dt = sessionTime - game.lastTick;
    if (dt < 0) dt = new Date().getTime() - game.lastTick;
    dt *= game.gameSpeed;
    if (tickSpent%5 == 0)fpsMeter.innerText = `FPS: ${Math.floor(1000/dt).toString().padStart(2, "0")}`;
    

    game.lastTick = new Date().getTime();

    for (const t in game.tiers) {
        game.tiers[t].update(dt);
    }

    if (!windowBlured) updateAllDom();

    keypressEvents();
    debugWork();
    
    tickSpent++;
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

let saveLoop = setInterval(save, 5000);