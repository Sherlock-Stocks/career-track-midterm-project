//superagent to hit different routes npm i superagent
const Stock = require('../models/stock');
const app = require('../../lib/app');
const superagent = require('superagent');
const { Router } = require('express');
const fetch = require('node-fetch');

// const { Router } = require('express');
// const fetch = require('node-fetch');

const getPortfolio = async(userInfo) => {

  //get userid from /verify
  const userId = userInfo.userId;
  
  //get portfolio from model
  const portfolio = await Stock.findStocksByUserId(userId);

  // findsPortfolioByUserId(userId);
  const stockHistory = await Promise.all(portfolio.map(stock => {
    const ticker = stock.ticker,
      startDate = stock.startDate,
      endDate = stock.endDate,
      frequency = stock.frequency;

    console.log('portfolio data', ticker, startDate, endDate, frequency);

    
    return fetch(`https://api.twelvedata.com/time_series?start_date=${startDate}&end_date=${endDate}&symbol=${ticker}&interval=${frequency}&apikey=${process.env.API_KEY}`)
      .then(res => res.json());
  }));

  await console.log(stockHistory, 'seeeeeeeeeee meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

  //for each portfolio item hit api
  
  //process algorithm
  
  //return portfolio array to display
  
  return [{}];
};

module.exports = {
  getPortfolio
};
