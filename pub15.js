"use strict";

const pub15 = {
    2019: {
        allowances: {
            daily: 16.2,
            weekly: 80.8,
            biweekly: 161.5,
            semimonthly: 175,
            monthly: 350,
            quarterly: 1050,
            semiannually: 2100,
            annually: 4200
        },
        min: {
            daily: {
                single: [14.6, 51.9, 166.4, 338.5, 632.8, 799.6, 1977.3],
                married: [45.4, 120, 349, 693.1, 1281.7, 1615.4, 2400.6]
            },
            weekly: {
                single: [73, 260, 832, 1692, 3164, 3998, 9887],
                married: [227, 600, 1745, 3465, 6409, 8077, 12003]
            },
            biweekly: {
                single: [146, 519, 1664, 3385, 6328, 7996, 19773],
                married: [454, 1200, 3490, 6931, 12817, 16154, 24006]
            },
            semimonthly: {
                single: [158, 563, 1803, 3667, 6855, 8663, 21421],
                married: [492, 1300, 3781, 7508, 13885, 17500, 26006]
            },
            monthly: {
                single: [317, 1125, 3606, 7333, 13710, 17325, 42842],
                married: [983, 2600, 7563, 15017, 27771, 35000, 52013]
            },
            quarterly: {
                single: [950, 3375, 10819, 22000, 41131, 51975, 128525],
                married: [2950, 7800, 22688, 45050, 83313, 105000, 156038]
            },
            semiannually: {
                single: [1900, 6750, 21638, 44000, 82263, 103950, 257050],
                married: [5900, 15600, 45375, 90100, 166625, 210000, 312075]
            },
            annually: {
                single: [3800, 13500, 43275, 88000, 164525, 207900, 514100],
                married: [11800, 31200, 90750, 180200, 333250, 420000, 624150]
            }
        },
        per: [10, 12, 22, 24, 32, 35, 37]
    },
    2020: {
        allowances: {
            daily: 17,
            weekly: 83,
            biweekly: 165,
            semimonthly: 179,
            monthly: 358,
            quarterly: 1075,
            semiannually: 2150,
            annually: 4300
        },
        min: {
            daily: {
                single: [14.6, 52.6, 168.9, 343.6, 642.7, 812.1, 2008.5],
                married: [45.8, 121.7, 354.4, 703.7, 1301.9, 1640.8, 2438.3]
            },
            weekly: {
                single: [73, 263, 845, 1718, 3213, 4061, 10042],
                married: [229, 609, 1772, 3518, 6510, 8204, 12191]
            },
            biweekly: {
                single: [146, 526, 1689, 3436, 6427, 8121, 20085],
                married: [458, 1217, 3544, 7037, 13019, 16408, 24383]
            },
            semimonthly: {
                single: [158, 570, 1830, 3722, 6963, 8798, 21758],
                married: [496, 1319, 3840, 7623, 14104, 17775, 26415]
            },
            monthly: {
                single: [317, 1140, 3660, 7444, 13925, 17596, 43517],
                married: [992, 2638, 7679, 15246, 28208, 35550, 52829]
            },
            quarterly: {
                single: [950, 3419, 10981, 22331, 41775, 52788, 130550],
                married: [2975, 7913, 23038, 45738, 84625, 106650, 158488]
            },
            semiannually: {
                single: [1900, 6838, 21963, 44663, 83550, 105575, 261100],
                married: [5950, 15825, 46075, 91475, 169250, 213300, 316975]
            },
            annually: {
                single: [3800, 13675, 43925, 89325, 167100, 211150, 522200],
                married: [11900, 31650, 92150, 182950, 338500, 426600, 633950]
            }
        },
        per: [10, 12, 22, 24, 32, 35, 37]
    }
};

function roundDollar(amount) {
    return Math.round(amount);
}

function roundCent(amount) {
    return Math.round(amount * 100) / 100;
}

function calcTax(year, payperiod, married, allowances, wage) {
    const allowance = pub15[year].allowances[payperiod];
    const adjustedWage = (wage - allowance * allowances);

    const mins = pub15[year].min[payperiod][married ? "married" : "single"];
    const pers = pub15[year].per;

    let sumTax = 0;
    for (let i = 0; i < mins.length; i++) {
        let min = mins[i];
        let per = pers[i];
        let max = i + 1 < mins.length ? mins[i + 1] : null;

        if (adjustedWage > min) {
            let currentMax = (max && adjustedWage >= max) ? max : adjustedWage;

            sumTax = roundCent(sumTax + (currentMax - min) * per / 100);
        } else {
            break;
        }
    }

    return roundCent(sumTax);
}