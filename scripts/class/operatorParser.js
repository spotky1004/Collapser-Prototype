"use strict";

/**
 * operatorParser.js by Spotky1004
*/
let operatorParserConfig = {
    warn : true
}

class operatorParser {
    constructor(d={}) {
        this.start = new D(d.start ?? 0);
        this.add = new D(d.add ?? 0);
        this.mul = new D(d.mul ?? 1);
        this.pow = new D(d.pow ?? 1);
        this.tetrate = new D(d.tet ?? d.tetrate ?? 1); // <- asdasfsasd
        this.pen = new D(d.pen ?? 1);

        this.ord = [...d.ord ?? ["add", "mul", "pow"]];
    }

    calculate(n) {
        n = new D(n);

        let x = new D(this.start);
        for (const o of this.ord) if (!this[o].eq(ingoreValues[o])) x = x[o](this[o][operatorStacker[o]](n));

        return x;
    }

    reverseCalc(n) {
        let x = new D(n);
        let c = 0;

        for (const o of [...this.ord].reverse()) {
            if (this[o].eq(ingoreValues[o])) continue;
            const os = reverseOperatorStacker[o];
            switch (o) {
                case "tetrate":
                    x = x.slog(10).div(this[o]).sub(1);
                    break;
                default:
                    x = x[os.s](this.start)[os.o](this[o]);
            }

            c++;
            if (operatorParserConfig.warn && c == 2) console.warn("[operatorParser] Dosen't support Reverse Calculate for multi operator yet.");
        }

        return x;
    }
    
    fReverseCalc(n) {
        // fixed reverse claculate
        return this.reverseCalc(n).add(1).floor(0);
    }
}

const ingoreValues = {
    add: new D(0),
    mul: new D(1),
    pow: new D(1),
    tet: new D(1)
};
const operatorStacker = {
    add: "mul",
    mul: "pow",
    pow: "pow",
    tetrate: "mul"
};
const reverseOperatorStacker = {
    add: {s: "sub", o: "div"},
    mul: {s: "div", o: "log"},
    pow: {s: "log", o: "log"}
};

const OP = operatorParser;