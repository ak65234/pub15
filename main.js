"use strict";

addEventListener("load", function () {
    let form = document.forms.fitx;

    let update = function () {
        let year = form.year.value;
        let payperiod = form.payperiod.value;
        let married = form.married.value === "1";
        let allowances = parseInt(form.allowances.value || 0);
        let wage = parseInt(form.wage.value || 0);

        let err = false;
        if (isNaN(allowances)) {
            form.allowances.value = "";

            document.querySelector("#allowancesWrapper").className = "column err";

            form.allowances.focus();

            err = true;
        } else {
            document.querySelector("#allowancesWrapper").className = "column";
            form.allowances.value = allowances;
        }

        if (isNaN(wage)) {
            form.wage.value = "";

            document.querySelector("#wageWrapper").className = "column err";

            if (!err)
                form.wage.focus();

            err = true;
        } else {
            document.querySelector("#wageWrapper").className = "column";
            form.wage.value = wage;
        }

        if (!err) {
            let tax = calcTax(year, payperiod, married, allowances, wage);
            document.querySelector("#dollar").value = roundDollar(tax);
            document.querySelector("#cent").value = roundCent(tax);
            document.querySelector("#output").className = document.querySelector("#output").className.replace(/hidden/g, "");
        }
    };

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        update();
    }, false);

    form.addEventListener("change", function(){
        update();
    }, false);
}, false);