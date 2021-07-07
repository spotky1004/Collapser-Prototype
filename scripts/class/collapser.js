"use strict";

class Collapser extends Upgrade {
    constructor(d={}, parent) {
        super(d, parent);
    }

    calcCostFactor() {
        return this.costMult.div(this.parent.collapserCostFactor());
    }
}