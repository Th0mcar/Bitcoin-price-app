
const { coindeskInstance } = require("./apiInstance");

const getCurrentValue = async () => {

  const url = "/v1/bpi/currentprice.json";

  try { 
    const { data } = await coindeskInstance.get(url); 
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getCurrentValue;
