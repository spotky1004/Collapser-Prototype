"use strict";

class upgradeTypeFormer {
    constructor(d={}) {
        this.name = d.name ?? "Null";
        this.cost = d.cost;
        this.effect = d.effect;
    }
}

let upgradeTypes = {
    0: new upgradeTypeFormer(
        {
            name: "Add",
            cost: {
                start: 10,
                pow  : 1.02
            },
            effect: {
                start: 1,
                add  : 1
            }
        }
    ),

    1: new upgradeTypeFormer(
        {
            name: "Mul",
            cost: {
                start: 100,
                pow  : 1.04,
            },
            effect: {
                start: 1,
                add  : 1,
                mul  : 1.2
            }
        }
    ),

    2: new upgradeTypeFormer(
        {
            name: "Pow",
            cost: {
                start: 1e6,
                pow  : 1.3,
            },
            effect: {
                start: 1,
                add  : 0.1
            }
        }
    ),
}

/**
   t: new upgradeTypeFormer(
        {
            name: "None",
            cost: {
                start: 1,
                add  : 5,
                mul  : 2,
                pow  : 1.05,
            },
            effect: {
                start: 1,
                add  : 1,
                mul  : 1,
                pow  : 1,
            }
        }
    ),
 */