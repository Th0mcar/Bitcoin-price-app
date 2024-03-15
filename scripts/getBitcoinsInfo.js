
const { coindeskInstance } = require("./apiInstance");

const getBitcoinInfo = async () => {
 
   const twoWeeksAgo = new Date(Date.now() - (14 * 24 * 60 * 60 * 1000));
   const url = `/v1/bpi/historical/close.json?start=${twoWeeksAgo.toISOString().slice(0,10)}&end=${new Date().toISOString().slice(0,10)}`;
    
  try {
    const { data } = await coindeskInstance.get(url);

    return data;

  } catch (error) {
    console.error(error);
  }
};

module.exports = getBitcoinInfo;
