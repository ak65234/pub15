"use strict";

const pub15test = {
    2019: {
        expected: {
            daily: {
                single: [0, 3.73, 17.47, 55.33, 125.96, 179.34, 591.54],
                married: [0, 7.46, 34.94, 110.64, 251.9, 358.68, 633.5],
            },
            weekly: {
                single: [0, 18.7, 87.34, 276.54, 629.82, 896.7, 2957.85],
                married: [0, 37.3, 174.7, 553.1, 1259.66, 1793.42, 3167.52]
            },
            biweekly: {
                single: [0, 37.3, 174.7, 553.32, 1259.64, 1793.4, 5915.35],
                married: [0, 74.6, 349.4, 1106.42, 2519.06, 3586.9, 6335.1]
            },
            semimonthly: {
                single: [0, 40.5, 189.3, 599.38, 1364.5, 1943.06, 6408.36],
                married: [0, 80.8, 378.52, 1198.46, 2728.94, 3885.74, 6862.84]
            },
            monthly: {
                single: [0, 80.8, 378.52, 1198.46, 2728.94, 3885.74, 12816.69],
                married: [0, 161.7, 757.26, 2397.14, 5458.1, 7771.38, 13725.93]
            },
            quarterly: {
                single: [0, 242.5, 1135.78, 3595.6, 8187.04, 11657.12, 38449.62],
                married: [0, 485, 2271.56, 7191.2, 16374.32, 23314.16, 41177.46]
            },
            semiannually: {
                single: [0, 485, 2271.56, 7191.2, 16374.32, 23314.16, 76899.16],
                married: [0, 970, 4543, 14382.5, 32748.5, 46628.5, 82354.75]
            },
            annually: {
                single: [0, 970, 4543, 14382.5, 32748.5, 46628.5, 153798.5],
                married: [0, 1940, 9086, 28765, 65497, 93257, 164709.5]
            }
        }
    }
}

function clear(id){
    document.querySelector("#" + id).value = "";
}

function log(str, id) {
    document.querySelector("#" + id).value += str + '\n';
}

function fail(str) {
    log(str, "fail");
}

function pass(str) {
    log(str, "pass");
}

function testMarital(year, payperiod, marital) {
    let expecteds = pub15test[year].expected[payperiod][marital];
    let mins = pub15[year].min[payperiod][marital];
    for (let i = 0; i < expecteds.length; i++) {
        let expected = expecteds[i];
        let actual = calcTax(year, payperiod, marital === "married", 0, mins[i]);
        if (expected !== actual)
            fail(year + " " + payperiod + " " + marital + ": " + expecteds[i] + " !== " + actual);
        else
            pass(year + " " + payperiod + " " + marital + ": " + expecteds[i] + " === " + actual)
    }
}

function testPayPeriod(year, payperiod) {
    for (let k in pub15test[year].expected[payperiod]) {
        testMarital(year, payperiod, k)
    }
}

function testYear(year) {
    for (let k in pub15test[year].expected) {
        testPayPeriod(year, k);
    }
}

addEventListener("load", function () {
    const form = document.forms.test;
    form.addEventListener("submit", function(e){
        e.preventDefault();

        testYear(form.year.value);
    }, false);

    form.clear.addEventListener("click", function(e) {
        clear("fail");
        clear("pass");
    }, false);
}, false);

