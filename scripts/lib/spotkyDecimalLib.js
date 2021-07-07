"use strict";

const D = Decimal;

// for who want to use time more effective...

// Number related: notation, clearify
// Etc.          : copyObj

const Spdl = {
    notation: function(number, exponentialFix=2, decimalFix=0, mode=0) {
        number = new D(number);

        if (mode === 1 && number.lt(1e15)) return number.floor().toNumber().toLocaleString().replaceAll(",", " ");

        //if (number.lt(new D(10).pow(D.min(-4, -decimalFix)))) return number.valueOf().replace(/\.([^e]+)/, (_,m1) => `.${m1.substr(0, exponentialFix)}`);
        //if (number.lt(0.01)) return number.valueOf().padEnd(decimalFix, "0");
        if (number.lt(1e5)) return number.toNumber().toFixed(Math.min(decimalFix, Math.max(0, decimalFix+1-Math.log10(number.toNumber()+1))));
        if (number.lt(new D(10).pow(new D(10).pow(exponentialFix)))) return number.toExponential(exponentialFix).replace("+", "").replace(/\.([^e]*)/, (_, m1) => "." + m1.padEnd(exponentialFix, "0"));
        if (number.eq(Infinity)) return "Infinity";
        if (number.lt("1ee" + (exponentialFix+2))) return "e" + number.log(10).floor(0);
        if (number.lt("1eeeeeeeeee10")) return "e" + number.log(10).floor(0).toExponential(exponentialFix).replace("+", "").replace(/\.([^e]*)/, (_, m1) => "." + m1.padEnd(exponentialFix, "0"));   
        return `(e^${number.layer})${number.mag}`;
        return number.valueOf();
    },
    clearify: function(number) {
        number = new D(number);
        if (number.lt(1000)) return number.floor(0);
        if (number.lt(1e100)) return number.div(new D(10).pow(number.log(10).sub(1))).floor(0).div(10).mul(new D(10).pow(number.log(10)));
        return number;
    },
    copyObj: function (obj) {
        let cObject = {};
        for (let i in obj) {
            if (Array.isArray(obj[i])) {
                cObject[i] = [];
                const tempArr = obj[i];
                for (let j = 0, l = tempArr.length; j < l; j++) {
                    cObject[i].push(tempArr[j] instanceof Decimal ? new D(tempArr[j]) : tempArr[j]);
                }
            } else if (typeof obj[i] === "object" && !(obj[i] instanceof Decimal)) {
                cObject[i] = this.copyObj(obj[i]);
            } else {
                cObject[i] = obj[i] instanceof Decimal ? new D(obj[i]) : obj[i];
          }
        }
        return cObject;
    }
}

const notation = Spdl.notation;