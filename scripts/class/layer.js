"use strict";

class Layer {
    constructor(d={}) {
        // set empty datas
        d.collapse = d.collapse ?? {};
        d.upgrades = d.upgrades ?? [];
        d.collapsers = d.collapsers ?? [];
        d.collapserModule = d.collapserModule ?? [];
        
        // set values
        this.tier = d.tier ?? 0;
        const d2 = leyerDatas[this.tier];

        this.j = new D(d.j ?? 0);
        this.totalJ = new D(d.totalJ ?? 0);
        this.collapse = {
            mul: new D(d.collapse.mul ?? 1),
            pow: new D(d.collapse.pow ?? 1)
        }
        this.costMult = d2.cost;

        this.upgrades = [];
        this.upgradeTypes = [...d2.upgrades];
        for (let i = 0, l = d2.upgrades.length; i < l; i++) this.upgrades.push(
            new LayerUpgrade({
                level: new D(d.upgrades[i] ?? 0),
                type: this.upgradeTypes[i],
                costMult: this.costMult,
                ...upgradeTypes[this.upgradeTypes[i]]
            }, this)
        );

        this.collapsers = [];
        for (let i = 0; i < 2; i++) this.collapsers.push(
            new Collapser({
                level: new D(d.collapsers[i] ?? 0),
                cost: collapserFactor[i].cost,
                effect: collapserFactor[i].effect,
                costMult: this.costMult
            }, this)
        );

        this.collapserModule = [...d.collapserModule];

        this.automation = d.automation ?? [];
        this.automationCharge = new Array(5).fill(0).map(e => e = new D(0));

        this.milestone = d.milestone ?? 0;

        this.idx = d.idx;
        this.realIdx = d.realIdx;
    }

    update(dt) {
        if (this.j.gt(this.getData().collapseAt)) this.collapseLayer();

        const dj = this.getProduction().mul(dt);

        this.j = this.j.add(dj);
        this.totalJ = this.totalJ.add(dj);

        this.collapse.mul = this.collapse.mul.mul(this.collapsers[0].calcEffect().pow(dt));
        this.collapse.pow = this.collapse.pow.add(this.collapsers[1].calcEffect().mul(dt));

        this.automationCharge = this.automationCharge.map((e,i) => e = e.add(this.getCollapse(2).mul(dt).mul(this.automation.includes(i)*1)));
        for (let i = 0, l = this.automationCharge.length; i < l; i++) {
            const count = this.automationCharge[i].floor(0);
            if (count.eq(0)) continue;
            this.automationCharge[i] = this.automationCharge[i].sub(count);
            if (i < 3) {
                this.upgrades[i].maxBuy(count, true);
            } else {
                this.collapsers[i-3].maxBuy(count, true);
            }
        }
    }

    maxBuyAll() {
        for (let i = this.upgrades.length-1; i >= 0; i--) this.upgrades[i].maxBuy(this);
    }

    getProduction() {
        let x = new D(0);
        for (let i = 0, l = this.upgrades.length; i < l; i++) {
            const tmpUpgrade = this.upgrades[i];
            const upgradeEffect = tmpUpgrade.calcEffect();
            switch (tmpUpgrade.type) {
                case 0:
                    x = x.add(upgradeEffect);
                    break;
                case 1:
                    x = x.mul(upgradeEffect);
                    break;
                case 2:
                    x = x.pow(upgradeEffect);
                    break;
            }
        }

        return x;
    }

    getCollapse(idx, pass=false) {
        if (!pass && !this.collapserModule.includes(idx)) return new D(1);
        let x = this.collapse.mul.pow(this.collapse.pow);
        switch (idx) {
            case 1:
                x = x.log(10).pow(3);
                break;
            case 2:
                x = x.add(1).log(10).pow(0.25).add(1).log(10).add(1);
                break;
        }
        return x;
    }
    upgradeCostFactor() {
        return this.getCollapse(0).mul(this.parent().getCollapse(0));
    }
    collapserCostFactor() {
        return this.getCollapse(1).mul(this.parent().getCollapse(0));
    }

    buyCollapserModule(idx) {
        if (this.j.gt(collapserModlueCost[idx])) {
            this.collapserModule.push(idx);
            this.j = this.j.sub(collapserModlueCost[idx]);

            this.collapserModule = [...new Set(this.collapserModule)]; // multi press fix
        }
    }
    buyAutomation(idx) {
        if (this.j.gt(automationsDatas[idx].cost)) {
            this.automation.push(idx);
            this.j = this.j.sub(automationsDatas[idx].cost);

            this.automation = [...new Set(this.automation)]; // multi press fix
        }
    }

    getData() {
        return leyerDatas[this.tier];   
    }

    parent() {
        return game.tiers[this.tier];
    }

    collapseLayer() {
        const parent = this.parent();

        parent.infinity = parent.infinity.add(1);

        parent.resetLayer(this.realIdx);
        if (!game.playerWatching.isMetaUpgrade) exitLayer();
    }
}
