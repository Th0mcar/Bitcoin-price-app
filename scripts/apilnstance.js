const axios = require("axios");

const coindeskInstance = axios.create({
    baseURL: "https://api.coindesk.com"
})

const currencyBeaconInstance = axios.create({
    baseURL: "https://api.currencybeacon.com",
})

const defaultParams = {
    api_key: "F1UCZzMIdrrtayUk4o7YF2Tje2DPsou4"
}

module.exports = {
    coindeskInstance,
    currencyBeaconInstance,
    defaultParams
};