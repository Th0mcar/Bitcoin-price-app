const { defaultParams, currencyBeaconInstance  } = require("./apiInstance");

const getCurrencyRates = async () => {
  const url = `/v1/latest`;
  try {
    const { data } = await currencyBeaconInstance.get(url, { params: defaultParams });
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports =  getCurrencyRates;
