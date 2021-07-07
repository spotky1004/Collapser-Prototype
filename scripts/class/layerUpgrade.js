"use strict";

class LayerUpgrade extends Upgrade {
    constructor(d={}, parent) {
        super(d, parent);
    }

    calcCostFactor() {
        return this.costMult.div(this.parent.upgradeCostFactor());
    }
}