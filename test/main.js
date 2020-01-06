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
    },
    2020: {
        expected: {
            daily: {
                single: [0, 3.8, 17.76, 56.19, 127.97, 182.18, 600.92],
                married: [0, 7.59, 35.51, 112.36, 255.93, 364.38, 643.5],
            },
            weekly: {
                single: [0, 19, 88.84, 280.9, 639.7, 911.06, 3004.41],
                married: [0, 38, 177.56, 561.68, 1279.76, 1821.84, 3217.29]
            },
            biweekly: {
                single: [0, 38, 177.56, 561.9, 1279.74, 1821.82, 6009.22],
                married: [0, 75.9, 355.14, 1123.6, 2559.28, 3643.76, 6435.01]
            },
            semimonthly: {
                single: [0, 41.2, 192.4, 608.64, 1386.48, 1973.68, 6509.68],
                married: [0, 82.3, 384.82, 1217.08, 2772.52, 3947.24, 6971.24]
            },
            monthly: {
                single: [0, 82.3, 384.7, 1217.18, 2772.62, 3947.34, 13019.69],
                married: [0, 164.6, 769.52, 2434.26, 5545.14, 7894.58, 13942.23]
            },
            quarterly: {
                single: [0, 246.9, 1154.34, 3651.34, 8317.9, 11842.06, 39058.76],
                married: [0, 493.8, 2308.8, 7302.8, 16635.68, 23683.68, 41826.98]
            },
            semiannually: {
                single: [0, 493.8, 2308.8, 7302.8, 16635.68, 23683.68, 78117.43],
                married: [0, 987.5, 4617.5, 14605.5, 33271.5, 47367.5, 83653.75]
            },
            annually: {
                single: [0, 987.5, 4617.5, 14605.5, 33271.5, 47367.5, 156235],
                married: [0, 1975, 9235, 29211, 66543, 94735, 167307.5]
            }
        }
    }
}

function clear(id) {
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
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        testYear(form.year.value);
    }, false);

    form.clear.addEventListener("click", function (e) {
        clear("fail");
        clear("pass");
    }, false);
}, false);
