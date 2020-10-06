//superagent to hit different routes npm i superagent


//get userid from signup/login/verify
//hit portfolioid endpoint
//for each portfolio item hit api
//process algorithm
//return portfolio array to display

// const { Router } = require('express');
// const fetch = require('node-fetch');

const getPortfolio = async({ userId, email, phoneNumber }) => {
  const data = [{  ticker: 'APPLE' }];

  return { userId, email, phoneNumber, portfolioArray: data };
};

module.exports = {
  getPortfolio
};
