"use strict";

class Tier {
    constructor(d={}) {
        this.tier = d.tier;
        this.layers = d.layers;
        for (let l = 0, length = this.layers.length; l < length; l++) {
            this.layers[l] = new Layer({tier: this.tier, realIdx: l, ...this.layers[l]});
        }
        
        this.experimentCount = new D(d.experimentCount ?? 1);
        this.infinity = new D(d.infinity ?? 0);
        this.collapsedInfinity = new D(d.collapsedInfinity ?? 0);

        d.collapse = d.collapse ?? {};
        this.collapse = {
            mul: new D(d.collapse.mul ?? 1),
            pow: new D(d.collapse.pow ?? 1)
        }

        this.collapsers = [];
        d.collapsers = d.collapsers ?? [];
        for (let i = 0; i < 2; i++) this.collapsers.push(
            new Collapser({
                level: new D(d.collapsers[i] ?? 0),
                cost: metaCollapserFactor[i].cost,
                effect: metaCollapserFactor[i].effect,
                costMult: 1
            }, this)
        );
    }

    resetLayer(idx) {
        this.layers[idx] = new Layer({tier: this.tier, idx: this.experimentCount, realIdx: idx});
        this.experimentCount = this.experimentCount.add(1);
    }

    update(dt) {
        dt = new D(dt).div(1000);
        
        this.collapse.mul = this.collapse.mul.mul(this.collapsers[0].calcEffect().pow(dt));
        this.collapse.pow = this.collapse.pow.add(this.collapsers[1].calcEffect().mul(dt));
        
        for (const l in this.layers) this.layers[l].update(dt.mul(this.getCollapse(1)));
    }

    getInfinityCollapseReq() {
        return new D(10).pow(new D(10).pow(this.collapsedInfinity.sqrt(2).add(4)));
    }
    calcInfninityCollapsePercent() {
        return Math.max(
            0,
            this.getCollapse().add(1).iteratedlog(10, 2).div(this.getInfinityCollapseReq().iteratedlog(10, 2)).toNumber()
        );
    }
    canInfCollapse() {
        return this.calcInfninityCollapsePercent() >= 1;
    }

    getCollapse(idx) {
        let x = this.collapse.mul.pow(this.collapse.pow);
        switch (idx) {
            // case 0:
            case 1:
                x = D.max(1, x.div(1e100).iteratedlog(new D(10).sub(x.slog(2)), 2));
                break;
        }
        return x;
    }

    prestige() {
        this.experimentCount = new D(0);
        this.infinity = new D(0);

        this.collapse.mul = new D(1);
        this.collapse.pow = new D(1);

        this.collapsers[0].level = new D(0);
        this.collapsers[1].level = new D(0);

        for (let i = 0, l = this.layers.length; i < l; i++) {
            this.resetLayer(i);
        }
    }

    collapserCostFactor() {
        return 1;
    }
}
