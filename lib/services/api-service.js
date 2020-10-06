//superagent to hit different routes npm i superagent
const { findStocksByUserId } = require('../models/stock');
const Stock = require('../models/stock');

// const { Router } = require('express');
// const fetch = require('node-fetch');

const getPortfolio = async(userInfo) => {

  //get userid from /verify
  const userId = userInfo.userId;
  
  // async & await
  //hit portfolioid endpoint
  // .post
  
  const portfolio = await Stock.findStocksByUserId(userId);
    

  console.log(portfolio, 'seeeeeeeeeee meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

  //for each portfolio item hit api
  //process algorithm
  //return portfolio array to display

  return [{}];
};

module.exports = {
  getPortfolio
};
