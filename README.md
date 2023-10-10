# FrontSeat

FrontSeat is a simple web app designed to assist in collecting and managing minibus fare payments. It streamlines the process of collecting payments from passengers and calculates the total amount collected, amount missing, and more to help the person in the front seat efficiently manage fare transactions.

## Features

- Simplify fare collection in a minibus.
- Input the fixed taxi fare per person and the number of passengers.
- Track the amount collected and the amount missing.
- Calculate the expected total (driver's money).
- Keep count of the number of people who have paid and those who still need to pay.
- Easily reset for a new trip by refreshing the page.
- View a history of calculations for the current trip.
- Undo previous calculations in case of errors.

## Usage

1. Open the [FrontSeat](https://frontseat.pages.dev) web app in your browser.
2. Input the fixed taxi fare per person and the total number of passengers in the "Start Trip" section.
3. Click the "Start Trip" button.
4. In the "Calculations" section, input the amount paid by passengers and the number of people paying.
5. Click the "Calculate" button to see the change, update the amounts, and keep track of payments.
6. Use the "History" button to view a history of calculations for the current trip.
7. If you make a mistake, you can use the "Undo" button to revert previous calculations.
8. When the collected amount equals the expected total, and no one needs to pay, you'll see a "Job Well Done" message.

## Screenshots

![Screenshot 1](/assets/screenshots/Screenshot1.png)
_Screenshot of the initial screen with input fields for taxi fare and passengers._

![Screenshot 2](/assets/screenshots/Screenshot2.png)
_Screenshot showing calculations and amounts collected._

![Screenshot 3](/assets/screenshots/Screenshot3.png)
_Screenshot displaying the "Job Well Done" message._

## Dependencies

- [Roboto Font](https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap) is used for typography.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
