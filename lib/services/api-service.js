const Stock = require('../models/stock');
const fetch = require('node-fetch');
const getAPISprinkler = require('../utils/keySprinkler');

const getPortfolio = async(userInfo) => {

  //get userid from /verify
  const userId = userInfo.userId;

  // findsPortfolioByUserId(userId)
  const portfolio = await Stock.findStocksByUserId(userId);

  //for each portfolio item hit api
  const stockHistory = await Promise.all(portfolio.map(stock => {
    const { ticker, startDate, endDate, frequency } = stock;

    return fetch(`https://api.twelvedata.com/time_series?start_date=${startDate}&end_date=${endDate}&symbol=${ticker}&interval=${frequency}&apikey=${getAPISprinkler}`)
      .then(res => res.json());
  }));

  //process algorithm
  function buyCondition({ currentStockPrice, buyAmount, numberOfStock, feeAsPercent, equity }) {
    if(currentStockPrice <= buyAmount && numberOfStock === 0) {
      const newNumberOfStock = (equity - (equity * feeAsPercent)) / currentStockPrice;
      const newEquity = numberOfStock * currentStockPrice;

      return { meetsCondition: true, equity: newEquity, numberOfStock: newNumberOfStock };
    }
  }

  function sellCondition({ currentStockPrice, sellAmount, numberOfStock, feeAsPercent }) {
    if(currentStockPrice >= sellAmount && numberOfStock !== 0) {
      const newEquity = (numberOfStock * currentStockPrice) - ((numberOfStock * currentStockPrice) * feeAsPercent);
      
      return { meetsCondition: true, equity: newEquity, numberOfStock: 0 };
    }
  }

  function calcEquityAndStocks({ stockHistory, currentPortfolio, originalEquity, originalNumberOfStock, feeAsPercent }) {
    let equity = originalEquity;
    let numberOfStock = originalNumberOfStock;
    
    for(let i = 0; i < stockHistory[1].values?.length || 0; i++) {
      const currentStockPrice = stockHistory[1].values[i].open;

      // the buy condition
      const calcBuyCondition = buyCondition({ currentStockPrice, buyAmount: currentPortfolio.buyAmount, numberOfStock, feeAsPercent, equity });

      // sell condition
      const calcSellCondition = sellCondition({ currentStockPrice, sellAmount: currentPortfolio.sellAmount, numberOfStock, feeAsPercent });
   
      // building the response
      if(calcBuyCondition.meetsCondition) {
        equity = calcBuyCondition.newEquity;
        numberOfStock = calcBuyCondition.newNumberOfStock;
      } 
      
      if(calcSellCondition.meetsCondition) {
        equity = calcSellCondition.newEquity;
        numberOfStock = calcSellCondition.newNumberOfStock;
      }
    }
    return { equity, numberOfStock };
  }

  function buildResponse({ currentPortfolio, equity }) {
    // eslint-disable-next-line indent
    return {
      stockId: currentPortfolio.stockId,
      ticker: currentPortfolio.ticker,
      startingAmount: currentPortfolio.startingAmount,
      startDate: currentPortfolio.startDate,
      endDate: currentPortfolio.endDate,
      feePercent: currentPortfolio.feePercent,
      buyAmount: currentPortfolio.buyAmount,
      sellAmount: currentPortfolio.sellAmount,
      result: `for your ${currentPortfolio.ticker} stock, your ending equity is ${equity}`
    };
  }

  return portfolio.map(currentPortfolio => {
    const feeAsPercent = currentPortfolio.feePercent / 100;
    let equity = currentPortfolio.startingAmount;
    let numberOfStock = 0;
  
    // looping throught the stock history
    const newEquityAndStocks = calcEquityAndStocks({ stockHistory, currentPortfolio, equity, numberOfStock, feeAsPercent });
    equity = newEquityAndStocks.equity;
    numberOfStock = newEquityAndStocks.numberOfStock;
  
    // build response
    return buildResponse({ currentPortfolio, equity });
  });
};

module.exports = {
  getPortfolio
};
