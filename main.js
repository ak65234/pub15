"use strict";

addEventListener("load", function () {
    let form = document.forms.fitx;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let year = form.year.value;
        let payperiod = form.payperiod.value;
        let married = form.married.value === "1";
        let allowances = form.allowances.value;
        let wage = form.wage.value;
        
        // TODO: Sanitize Input

        let tax = calcTax(year, payperiod, married, allowances, wage);
        document.querySelector("#dollar").value = roundDollar(tax);
        document.querySelector("#cent").value = roundCent(tax);
        document.querySelector("#output").className = document.querySelector("#output").className.replace(/hidden/g, "");
    }, false);
}, false);