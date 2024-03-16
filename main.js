const { app, BrowserWindow, screen, ipcMain } = require("electron");
const storeClass = require("electron-store");
const getBitcoinInfo = require("./scripts/getBitcoinsInfo");
const getCurrentValue = require("./scripts/getCurrentValue");
const getCurrencyRates = require("./scripts/getCurrencyRates");
let appWin;

const store = new storeClass();

ipcMain.on("get-current-price",async (event, arg) => {
   await autoUpdateCurrentPrice()
});

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

    const primaryDisplay = screen.getPrimaryDisplay();
    const dimensions = primaryDisplay.size;
    const winWidth = 400; 
    const x = dimensions.width - winWidth;
    const y = 0; 
    appWin.setPosition(x, y);
}

app.on("ready",async () => {
    try {
        const currencyData = await getCurrencyRates();
        store.set('currencyData', currencyData);
        setInterval(async () => await autoUpdateCurrentPrice(), 60 * 1000);
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

async function autoUpdateCurrentPrice() {
    console.log('Updating...')
    try {
        
        const lastTwoWeeksPrices = await getBitcoinInfo();
        const current = await getCurrentValue(); 
        const date = new Date();
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset*60*1000));
        
        store.set('bitcoinsPrices', {...lastTwoWeeksPrices, bpi: {
            ...lastTwoWeeksPrices.bpi, [adjustedDate.toISOString().split('T')[0]] : current.bpi.USD.rate_float
        }});

        appWin.webContents.send('update-current-price');
    } catch (error) {
        console.error(error);
    } finally {
        console.log('Updated');
    }
}