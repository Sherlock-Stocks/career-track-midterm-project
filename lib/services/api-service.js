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

  // findsPortfolioByUserId(userId)
  const portfolio = await Stock.findStocksByUserId(userId);

  //for each portfolio item hit api
  const stockHistory = await Promise.all(portfolio.map(stock => {
    const { ticker, startDate, endDate, frequency } = stock;
    
    return fetch(`https://api.twelvedata.com/time_series?start_date=${startDate}&end_date=${endDate}&symbol=${ticker}&interval=${frequency}&apikey=${process.env.API_KEY}`)
      .then(res => res.json());
  }));

  //console.log(stockHistory.map(stock => stock.values), 'history is here!');

  //process algorithm



  //return portfolio array to display
  
  return ['output one put this on the first line', 'output two put this on the second line'];
};

module.exports = {
  getPortfolio
};
