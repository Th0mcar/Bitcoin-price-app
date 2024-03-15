const { app, BrowserWindow, screen } = require("electron");
const storeClass = require("electron-store");
const getBitcoinInfo = require("./scripts/getBitcoinsInfo");
const getCurrentValue = require("./scripts/getCurrentValue");
const getCurrencyRates = require("./scripts/getCurrencyRates");
let appWin;

const store = new storeClass();

createWindow = () => {
    appWin = new BrowserWindow({
        width: 400,
        height: 900,
        title: "Angular Electron Bitcoin",
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        } 
    });
    
    appWin.loadURL(`file://${__dirname}/dist/angular-electron-bitcoin/browser/index.html`);

    appWin.setMenu(null);

    appWin.on("closed", () => {
        appWin = null;
    });

    let primaryDisplay = screen.getPrimaryDisplay();
    let dimensions = primaryDisplay.size;
    let winWidth = 400;
    let winHeight = 900;
    let x = dimensions.width - winWidth;
    let y = 0; 
    appWin.setPosition(x, y);
}

app.on("ready",async () => {
    try {
        const data = await getBitcoinInfo();
        const currencyData = await getCurrencyRates();
        store.set('currencyData', currencyData);
        await autoUpdateCurrentPrice(data);
        setInterval(async () => await autoUpdateCurrentPrice(data), 60 * 1000);
    } catch (error) {
        console.error(error);
    }
  });
  
app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

async function autoUpdateCurrentPrice(lastTwoWeeksPrices) {
    console.log('Updating...')
    try {
        const current = await getCurrentValue(); 
        const date = new Date();
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset*60*1000));
        
        store.set('bitcoinsPrices', {...lastTwoWeeksPrices, bpi: {
            ...lastTwoWeeksPrices.bpi, [adjustedDate.toISOString().split('T')[0]] : current.bpi.USD.rate_float
        }});
    } catch (error) {
        console.error(error);
    } finally {
        console.log('Updated');
    }
}
