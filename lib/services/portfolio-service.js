const Stock = require('../models/stock');
const fetch = require('node-fetch');
const getAPISprinkler = require('../utils/keySprinkler');

const getPortfolio = async(userInfo) => {
  const userId = userInfo.userId;
  const portfolio = await Stock.findStocksByUserId(userId);
  const stockHistory = await Promise.all(portfolio.map(stock => {
    const { ticker, startDate, endDate, frequency } = stock;

    return fetch(`https://api.twelvedata.com/time_series?start_date=${startDate}&end_date=${endDate}&symbol=${ticker}&interval=${frequency}&apikey=${getAPISprinkler}`)
      .then(res => res.json());
  }));

  function buyCondition({ currentStockPrice, buyAmount, numberOfStock, feeAsPercent, equity }) {
    const newNumberOfStock = (equity - (equity * feeAsPercent)) / currentStockPrice;
    const newEquity = newNumberOfStock * currentStockPrice;

    return { 
      meetsCondition: currentStockPrice <= buyAmount && numberOfStock === 0,
      equity: newEquity,
      numberOfStock: newNumberOfStock 
    };
  }

  function sellCondition({ currentStockPrice, sellAmount, numberOfStock, feeAsPercent }) {
    const newEquity = (numberOfStock * currentStockPrice) - ((numberOfStock * currentStockPrice) * feeAsPercent);
    
    return { 
      meetsCondition: currentStockPrice >= sellAmount && numberOfStock !== 0,
      equity: newEquity,
      numberOfStock: 0
    };
  }

  function calcEquityAndStocks({ stockHistory, currentPortfolio, originalEquity, numberOfStock: originalNumberOfStock, feeAsPercent }) {
    let equity = originalEquity;
    let numberOfStock = originalNumberOfStock;

    for(let i = 0; i < stockHistory.values?.length || 0; i++) {
      const currentStockPrice = stockHistory.values[i].open;

      const calcBuyCondition = buyCondition({ currentStockPrice, buyAmount: currentPortfolio.buyAmount, numberOfStock, feeAsPercent, equity });

      const calcSellCondition = sellCondition({ currentStockPrice, sellAmount: currentPortfolio.sellAmount, numberOfStock, feeAsPercent });

      if(calcBuyCondition.meetsCondition) {
        equity = calcBuyCondition.equity;
        numberOfStock = calcBuyCondition.numberOfStock;
      } 
      
      if(calcSellCondition.meetsCondition) {
        equity = calcSellCondition.equity;
        numberOfStock = calcSellCondition.numberOfStock;
      }
    }
    return { equity, numberOfStock };
  }

  function buildResponse({ currentPortfolio, equity }) {
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

  return portfolio.map((currentPortfolio, p) => {
    const feeAsPercent = currentPortfolio.feePercent / 100;
    let equity = currentPortfolio.startingAmount;
    let numberOfStock = 0;

    const newEquityAndStocks = calcEquityAndStocks({ stockHistory:stockHistory[p], currentPortfolio, originalEquity: equity, numberOfStock, feeAsPercent });
    
    equity = newEquityAndStocks.equity;
    numberOfStock = newEquityAndStocks.numberOfStock;

    return buildResponse({ currentPortfolio, equity });
  });
};

module.exports = {
  getPortfolio
};
