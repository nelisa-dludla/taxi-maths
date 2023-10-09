// INIT SECTION VARIABLES
const initSection = document.getElementById("init");
const taxiFareEle = document.getElementById("taxi-fare");
const numOfPassengersEle = document.getElementById("number-of-passengers");
const startTripBtn = document.getElementById("btn__start-trip");
const initAlert = document.getElementById("init__alert");
const image = document.getElementById("image");

// CALCULATIONS SECTION VARIABLES
const calculationsSection = document.getElementById("calculations");
const amountEle = document.getElementById("amount");
const numberOfPeopleEle = document.getElementById("number-of-people");
const calculateBtn = document.getElementById("btn__calculate");
const returnElements = document.querySelectorAll(".return");
const calculationsAlert = document.getElementById("calculations__alert");
const historyBtns = document.querySelectorAll(".btn__history");

// JOB DONE SECTION VARIABLE
const jobDoneSection = document.getElementById("job-done");

// STATS SECTION VARIABLES
const statsSection = document.getElementById("stats");
const amountCollected = document.querySelector(".amount-collected");
const amountMissing = document.querySelector(".amount-missing");
const expectedTotal = document.querySelector(".expected-total");
const peopleWhoPaid = document.querySelector(".number-of-people-paid");
const peopleStillToPay = document.querySelector(
        ".number-of-people-still-to-pay"
);

// HISTORY SECTION VARIABLES
const historySection = document.getElementById("history");
const historyList = document.getElementById("list");

// Functions
const isValidTrip = (taxiFare, numOfPassengers) =>
        taxiFare && numOfPassengers ? true : false;

const storeCalculations = (
        amount,
        numberOfPeople,
        returnAmount,
        historyData
) => {
        historyData.push(
                `Recieved R${amount} for ${numberOfPeople} people and returned R${returnAmount}.`
        );
};

const updateHistory = () => {
        let html = "";
        historyData.forEach((ele) => {
                html += `<li>${ele}</li>`;
        });

        historyList.innerHTML = html;
};
// Event Listeners
startTripBtn.addEventListener("click", () => {
        const taxiFare = parseFloat(taxiFareEle.value);
        const numOfPassengers = parseInt(numOfPassengersEle.value);

        if (isValidTrip(taxiFare, numOfPassengers)) {
                amountCollected.textContent = "R0";
                amountMissing.textContent = "R0";
                expectedTotal.textContent = `R${taxiFare * numOfPassengers}`;
                peopleWhoPaid.textContent = "0";
                peopleStillToPay.textContent = "0";

                calculationsSection.classList.remove("hidden");
                statsSection.classList.remove("hidden");
                initSection.classList.add("hidden");
                image.classList.add("hidden");
        } else {
                initAlert.classList.remove("hidden");
        }
});

let collected = 0;
let missing = 0;
let numOfPeoplePaid = 0;
let needToPay = 0;
let historyData = [];

calculateBtn.addEventListener("click", () => {
        const amount = parseFloat(amountEle.value);
        const numberOfPeople = parseInt(numberOfPeopleEle.value);
        const taxiFare = parseFloat(taxiFareEle.value);
        const numOfPassengers = parseInt(numOfPassengersEle.value);
        const returnAmount = amount - numberOfPeople * taxiFare;

        if (amount >= numberOfPeople * taxiFare) {
                const expected = taxiFare * numOfPassengers;
                returnElements.forEach(
                        (ele) => (ele.innerText = `R${returnAmount}`)
                );

                collected += amount - returnAmount;
                amountCollected.textContent = `R${collected}`;

                missing = expected - collected;
                amountMissing.innerText = `R${missing}`;

                numOfPeoplePaid += (amount - returnAmount) / taxiFare;
                peopleWhoPaid.innerText = `${numOfPeoplePaid}`;

                needToPay = (expected - collected) / taxiFare;
                peopleStillToPay.innerText = `${needToPay}`;

                calculationsAlert.classList.add("hidden");

                storeCalculations(
                        amount,
                        numberOfPeople,
                        returnAmount,
                        historyData
                );

                console.log(historyData);

                if (collected === expected && needToPay === 0) {
                        jobDoneSection.classList.remove("hidden");
                        calculationsSection.classList.add("hidden");
                        historySection.classList.add("hidden");
                }
        } else {
                calculationsAlert.classList.remove("hidden");
        }
});

historyBtns.forEach((button) => {
        button.addEventListener("click", () =>
                historySection.classList.toggle("hidden")
        );
});
// historyBtn.addEventListener("click", () => {
//         historySection.classList.toggle("hidden");
// });

setInterval(updateHistory, 1000);
