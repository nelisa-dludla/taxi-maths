// INIT SECTION VARIABLES
const initSection = document.getElementById("init");
const taxiFareEle = document.getElementById("taxi-fare");
const numOfPassengersEle = document.getElementById("number-of-passengers");
const startTripBtn = document.getElementById("btn__start-trip");

// CALCULATIONS SECTION VARIABLES
const calculationsSection = document.getElementById("calculations");
const amountEle = document.getElementById("amount");
const numberOfPeopleEle = document.getElementById("number-of-people");
const calculateBtn = document.getElementById("btn__calculate");
const changeEle = document.getElementById("change");

// STATS SECTION VARIABLES
const statsSection = document.getElementById("stats");
const amountCollected = document.querySelector(".amount-collected");
const amountMissing = document.querySelector(".amount-missing");
const expectedTotal = document.querySelector(".expected-total");
const peopleWhoPaid = document.querySelector(".number-of-people-paid");
const peopleStillToPay = document.querySelector(
        ".number-of-people-still-to-pay"
);

// Functions
const isValidTrip = (taxiFare, numOfPassengers) =>
        taxiFare && numOfPassengers ? true : false;

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

                calculationsSection.classList.toggle("hidden");
                statsSection.classList.toggle("hidden");
                initSection.classList.toggle("hidden");
        } else {
                console.log("This trip is not valid");
        }
});

let collected = 0;
let missing = 0;
let numOfPeoplePaid = 0;
let needToPay = 0;

calculateBtn.addEventListener("click", () => {
        const amount = parseFloat(amountEle.value);
        const numberOfPeople = parseInt(numberOfPeopleEle.value);
        const taxiFare = parseFloat(taxiFareEle.value);
        const numOfPassengers = parseInt(numOfPassengersEle.value);
        const change = amount - numberOfPeople * taxiFare;
        let activeTrip = true;

        while (activeTrip) {
                const expected = taxiFare * numOfPassengers;
                changeEle.innerText = `R${change}`;

                collected += amount - change;
                amountCollected.textContent = `R${collected}`;

                missing = expected - collected;
                amountMissing.innerText = `R${missing}`;

                numOfPeoplePaid += (amount - change) / taxiFare;
                peopleWhoPaid.innerText = `${numOfPeoplePaid}`;

                console.log(
                        `needToPay = (${expected} - ${numOfPeoplePaid}) / ${taxiFare})`
                );
                needToPay = (expected - collected) / taxiFare;
                peopleStillToPay.innerText = `${needToPay}`;

                if (amountCollected === expectedTotal) {
                        active = false;
                }
        }
});