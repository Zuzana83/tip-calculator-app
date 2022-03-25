const tipForm = document.getElementById("tip-form");
const billAmount = document.getElementById("bill-amount");
const tipBtns = document.querySelectorAll(".tip-btn");
const customAmount = document.getElementById("custom-amount");
const peopleAmount = document.getElementById("people-amount");
const tipSum = document.getElementById("tip-sum");
const totalSum = document.getElementById("total-sum");
const resetBtn = document.getElementById("reset-btn");
const alert = document.querySelector(".alert");
const numPeopleWrapper = document.querySelector(".people-fc");

function removeActiveClass() {
    tipBtns.forEach((btn) => {
        btn.classList.remove("active");
    })
}

function calculateTip(tipNum) {
    let billNum = +billAmount.value;
    let numOfPeople = +peopleAmount.value;

    console.log(billNum, numOfPeople, tipNum);

    if(numOfPeople < 1) {
        alert.classList.add("show");
        numPeopleWrapper.classList.add("error");
        return;
    } else {
        alert.classList.remove("show");
        numPeopleWrapper.classList.remove("error");
    }

    let totalPerPerson = (billNum * (tipNum + 100)/100) / numOfPeople;
    totalPerPerson = Math.round(totalPerPerson * 100) / 100;

    totalSum.textContent = `$${totalPerPerson}`;

    let tipPerPerson = (billNum * tipNum / 100) / numOfPeople;
    tipPerPerson = Math.round(tipPerPerson * 100) / 100;

    tipSum.textContent = `$${tipPerPerson}`;

    resetBtn.classList.add("active");

    console.log(totalPerPerson, tipPerPerson);
}

tipBtns.forEach((btn) => {
    btn.addEventListener("click", function(e) {
        const choosenTip = +e.target.getAttribute("data-percent");
        e.target.classList.add("active");
        calculateTip(choosenTip);
    })
})

resetBtn.addEventListener("click", () => {
    tipSum.textContent = "$0.00";
    totalSum.textContent= "$0.00";
    billAmount.value = "";
    peopleAmount.value = "";
    customAmount.value = "";

    alert.classList.remove("show");
    numPeopleWrapper.classList.remove("error");

    resetBtn.classList.remove("active");
    removeActiveClass();
})

customAmount.addEventListener("keyup", () => {
    const tip = +customAmount.value;
    calculateTip(tip);
})


