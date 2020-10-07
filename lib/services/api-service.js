//superagent to hit different routes npm i superagent
const Stock = require('../models/stock');
const fetch = require('node-fetch');

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
    
    return fetch(`https://api.twelvedata.com/time_series?start_date=${startDate}&end_date=${endDate}&symbol=${ticker}&interval=${frequency}&apikey=${process.env.API_KEY}`)
      .then(res => res.json());
  }));

  console.log(stockHistory.map(stock => stock.values), 'history is here!');

  //process algorithm

  // const stockPrices = [152, 129, 135, 141, 144, 146, 142, 150, 151, 150, 152, 154, 154, 153, 154, 156, 153, 148, 145];
  // const buyPrice = 120;
  // const sellPrice = 170;
  // const feePercent = 2;

  // let equity = 1000;
  // let numberOfStock = 0;
  // let text = [];

  // for (let p = 0; p < portfolio.length; p++) {

  //   for (let i = 0; i < stockPrices.length; i++) {
  //     const currentStockPrice = stockPrices[i];

  //     if (currentStockPrice >== buyPrice && numberOfStock === 0) {
  //       numberOfStock = (equity - (equity * feePercent)) / currentStockPrice;
  //       equity = numberOfStock * currentStockPrice;
  //     } else if (currentStockPrice <== sellPrice && numberOfStock !== 0) {
  //       equity = (numberOfStock * currentStockPrice) - ((numberOfStock * currentStockPrice) * feePercent);
  //       numberOfStock = 0;
  //     }
  //   }

  //   if (i === stockPrices.length - 1) {
  //     //get ticker and dates from portfolio

  //     text.push(`for your ${ticker} stock, your ending equity is ${equity}`)
  //   }
  // }

  //return portfolio array to display
  
  // return text

  return ['output one put this on the first line', 'output two put this on the second line'];
};

module.exports = {
  getPortfolio
};
