"use strict";

class Upgrade {
    constructor(d={}, parent) {
        this.level = d.level??0;
        this.type = d.type??0;

        /** @type {operatorParser} */
        this.cost = new operatorParser(d.cost);
        this.costMult = new D(d.costMult);
        this.effect = new operatorParser(d.effect);

        this.parent = parent;
        this.parentType = this.parent.constructor.name;
        this.resourceName = this.parentType === "Layer" ? "j" : "infinity";
    }

    calcCostFactor() {
        return 1;
    }

    calcEffect(lv=this.level) {
        return this.effect.calculate(lv);
    }
    calcCost(lv=this.level) {
        return D.max(this.cost.start, this.cost.calculate(lv).mul(this.calcCostFactor()));
    }

    buy() {
        const resource = this.parent[this.resourceName];

        if (resource.gte(this.calcCost().floor(0))) {
            this.parent[this.resourceName] = resource.sub(this.calcCost().floor(0));
            this.level = this.level.add(1);
        }
    }
    maxBuy(cap=new D(Infinity), fromAutomate=false) {
        const resource = this.parent[this.resourceName];

        let x = this.cost.fReverseCalc(resource.div(this.calcCostFactor()));
        x = D.min(cap.add(this.level), x);
        if (x.gt(this.level)) {
            if (!fromAutomate) this.parent[this.resourceName] = resource.sub(this.cost.calculate(x).div(this.calcCostFactor()));
            this.level = x;
        }
    }
}