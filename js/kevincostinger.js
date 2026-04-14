"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Anna Zupan - 2026-04-13
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.

function submitForm(e){
    //TODO: Prevent the default behavior of the submit button.
    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.

    e.preventDefault();

    let dateField = document.getElementById("date");
    let amountField = document.getElementById("amount");
    let expenseField = document.getElementById("expense");

    let dateVal = dateField.value;
    let amountVal = parseFloat(amountField.value);
    let expenseVal = expenseField.value;

    if (isEmpty(dateVal)) {
        alert("Bitte Datum eingeben!");
        dateField.focus();
        return;
    }
    if (isNaN(amountVal) || amountVal < 0.01) {
        alert("Bitte einen Betrag mit mindestens 0.01 eingeben!");
        amountField.focus();
        return;
    }
    if (expenseVal.length < 3) {
        alert("Bitte einen Text mit mindestens 3 Zeichen eingeben!");
        expenseField.focus();
        return;
    }

    let tr = document.createElement("tr");
    tr.dataset.amount = amountVal;

    let tdDate = document.createElement("td");
    tdDate.textContent = dateVal;

    let tdAmount = document.createElement("td");
    tdAmount.textContent = formatEuro(amountVal);

    let tdText = document.createElement("td");
    tdText.textContent = expenseVal;

    let tdDelete = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    tdDelete.append(deleteBtn);

    tr.append(tdDate, tdAmount, tdText, tdDelete);
    document.querySelector("#expenses tbody").append(tr);

    sumExpenses += amountVal;
    document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);

    e.target.reset();
}

let form = document.querySelector("form");
form.addEventListener("submit", submitForm);

let table = document.getElementById("expenses");
table.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
        let row = e.target.closest("tr");

        let amountToRemove = parseFloat(row.dataset.amount);
        sumExpenses -= amountToRemove;

        document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);

        row.remove();
    }
});

/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}