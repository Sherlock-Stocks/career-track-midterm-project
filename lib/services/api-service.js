//superagent to hit different routes npm i superagent
const Stock = require('../models/stock');
const fetch = require('node-fetch');
const getAPISprinkler = require('../utils/keySprinkler');
// const { Router } = require('express');
// const fetch = require('node-fetch');

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
  let text = [];

  for(let p = 0; p < portfolio.length; p++) {
    const currentPortfolio = portfolio[p];
    const feeAsPercent = currentPortfolio.feePercent / 100;
    let equity = currentPortfolio.startingAmount;
    let numberOfStock = 0;

    for(let i = 0; i < stockHistory[1].values?.length || 0; i++) {
      const currentStockPrice = stockHistory[1].values[i].open;

      if(currentStockPrice <= currentPortfolio.buyAmount && numberOfStock === 0) {
        numberOfStock = (equity - (equity * feeAsPercent)) / currentStockPrice;
        equity = numberOfStock * currentStockPrice;

      } else if(currentStockPrice >= currentPortfolio.sellAmount && numberOfStock !== 0) {
        equity = (numberOfStock * currentStockPrice) - ((numberOfStock * currentStockPrice) * feeAsPercent);
        numberOfStock = 0;
      }

      if(i === stockHistory[1].values.length - 1) {
        text.push(`for your ${currentPortfolio.ticker} stock, your ending equity is ${equity}`);
      }
    }
  }
  return text;
};

module.exports = {
  getPortfolio
};
