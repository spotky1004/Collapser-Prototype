"use strict";

const collapserFactor = [
    {
        cost: {
            start: 1e10,
            pow: 1.1
        },
        effect: {
            start: 1,
            add : 0.1,
            pow: 1.23,
        }
    },
    {
        cost: {
            start: 1e100,
            pow: 1.45
        },
        effect: {
            add: 0.1,
            mul: 2
        }
    }
];

const metaCollapserFactor = [
    {
        cost: {
            start: 1,
            mul: 1.13
        },
        effect: {
            start: 1,
            add: 0.008,
            mul: 1.03,
            pow: 1.2,
        }
    },
    {
        cost: {
            start: 1000,
            pow: 1.2
        },
        effect: {
            add: 0.001,
            mul: 2.5,
            pow: 1.04
        }
    }
];
