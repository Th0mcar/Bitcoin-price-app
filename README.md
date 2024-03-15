# Bitcoin Price Tracker App

This application displays the closing price of Bitcoin (BTC) in USD over the past 2 weeks, including the current day. It provides real-time updates for the current day's price, which refreshes every 60 seconds. Additionally, users can view details of each day's price in USD, EUR, and COP by selecting a specific day from the list.

## Installation

To install and run the app, follow these simple steps:

1. Install dependencies:
    ```bash
    npm i
    ```

2. Run Electron:
    ```bash
    npm run electron
    ```

## Features

- Displays Bitcoin (BTC) closing prices in USD for the past 2 weeks.
- Real-time update for the current day's price every 60 seconds.
- Static display of prices for past days based on their closing price in USD.
- Selecting a day from the list shows detailed information including the price in USD, EUR, and COP.
- Offline functionality: Stores the latest fetched information locally to ensure app functionality even without an internet connection. Persistence is implemented using the application container.
- External API requests are managed within the application container to bypass CORS issues.

## Technologies Used

- Angular
- Electron
- Node.js
- Axios

## Notes

- Ensure internet connectivity for real-time updates.
- For offline functionality, the latest fetched information will be displayed in case of no internet connection.
- For security reasons, API requests are managed within the application container to avoid CORS issues.
- This app does not utilize browser local storage; instead, it implements data persistence using the application container.
