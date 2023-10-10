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
const undoBtn = document.getElementById("btn__undo");

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

// FUNCTIONS
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

        historyData
                ? (historyList.innerHTML = html)
                : (historyList.innerHTML = "<p>No History</p>");
};

const renderStats = () => {
        // Amount collected from passengers
        amountCollected.textContent = `R${
                calculatedData.collectedData[
                        calculatedData.collectedData.length - 1
                ]
        }`;

        // Amount still needed to be collected from passengers
        amountMissing.innerText = `R${
                calculatedData.missingData[
                        calculatedData.missingData.length - 1
                ]
        }`;

        // Number of people who have paid
        peopleWhoPaid.innerText = `${
                calculatedData.numOfPeoplePaidData[
                        calculatedData.numOfPeoplePaidData.length - 1
                ]
        }`;

        // Number of people who haven't paid
        peopleStillToPay.innerText = `${
                calculatedData.needToPayData[
                        calculatedData.needToPayData.length - 1
                ]
        }`;
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

let historyData = [];

let calculatedData = {
        collectedData: [0],
        missingData: [0],
        numOfPeoplePaidData: [0],
        needToPayData: [0],
};

let calculateCount = 0;

calculateBtn.addEventListener("click", () => {
        const amount = parseFloat(amountEle.value);
        const numberOfPeople = parseInt(numberOfPeopleEle.value);
        const taxiFare = parseFloat(taxiFareEle.value);
        const numOfPassengers = parseInt(numOfPassengersEle.value);
        const returnAmount = amount - numberOfPeople * taxiFare;

        // Check if the amount is enough to cover the number of people
        if (amount >= numberOfPeople * taxiFare) {
                let expected = taxiFare * numOfPassengers;
                calculateCount += 1;

                // Updates return values for both return elements
                returnElements.forEach(
                        (ele) => (ele.innerText = `R${returnAmount}`)
                );

                // Calculate amount collected from passengers
                collected =
                        calculatedData.collectedData[
                                calculatedData.collectedData.length - 1
                        ];
                collected += amount - returnAmount;
                calculatedData.collectedData.push(collected);

                // Calculate amount still needed to be collected from passengers
                missing =
                        calculatedData.missingData[
                                calculatedData.missingData.length - 1
                        ];
                missing = expected - collected;
                calculatedData.missingData.push(missing);

                // Calculate number of people who still need to pay
                numOfPeoplePaid =
                        calculatedData.numOfPeoplePaidData[
                                calculatedData.numOfPeoplePaidData.length - 1
                        ];
                numOfPeoplePaid += (amount - returnAmount) / taxiFare;
                calculatedData.numOfPeoplePaidData.push(numOfPeoplePaid);

                // Calculate number of people who haven't paid
                needToPay =
                        calculatedData.needToPayData[
                                calculatedData.needToPayData.length - 1
                        ];
                needToPay = (expected - collected) / taxiFare;
                calculatedData.needToPayData.push(needToPay);

                calculationsAlert.classList.add("hidden");

                storeCalculations(
                        amount,
                        numberOfPeople,
                        returnAmount,
                        historyData
                );
                updateHistory();
                renderStats();
                // Checks if job is completed
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

undoBtn.addEventListener("click", () => {
        const keys = Object.keys(calculatedData);

        if (calculateCount > 0) {
                console.log(`calculateCount is ${calculateCount}`);
                console.log("\nThis if statement inside undo ran\n");
                keys.forEach((ele) => calculatedData[ele].pop());
                historyData.pop();
                updateHistory();
                renderStats();
                calculateCount -= 1;
        }
});

// setInterval(updateHistory, 1000);
// setInterval(renderStats, 1000);
