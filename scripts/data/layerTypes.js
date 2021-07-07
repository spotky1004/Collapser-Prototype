"use strict";

let leyerDatas = {
    0: {
        name: "Yocto",
        cost: new D(1),
        upgrades: [0, 1, 2],
        milestones: [
            {
                type: "energy",
                name: "Unlock Collapser",
                goal: new D(1e10)
            },
            {
                type: "energy",
                name: "Unlock Automation",
                goal: new D(1e100)
            },
            {
                type: "energy",
                name: "Collapse!",
                goal: new D("e500")
            },
        ],
        collapseAt: new D("e500")
    },
    1: {
        name: "Zepto"
    },
    2: {
        name: "Pico"
    },
    3: {
        name: "Nano"
    },
    4: {
        name: "Micro"
    },
    5: {
        name: "Milli"
    },
    6: {
        name: "Meter"
    },
    //
    7: {
        name: "Killo"
    },
    8: {
        name: "Mega"
    },
    9: {
        name: "Giga"
    },
    10: {
        name: "Tera"
    }
};

// SI units: yocto zepto pico nano micro milli meter killo mega giga tera peta exa zetta yotta