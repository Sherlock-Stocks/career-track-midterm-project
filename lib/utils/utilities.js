const { Router } = require('express');
const fetch = require('node-fetch');
const getAPISprinkler = require('../utils/keySprinkler');

module.exports = Router()

  .post('/:ticker', (req, res, next) => {
    fetch(`https://api.twelvedata.com/time_series?start_date=${req.body.startDate}&end_date=${req.body.endDate}&symbol=${req.params.ticker}&interval=${req.body.frequency}&apikey=${getAPISprinkler()}`)
      .then(res => res.json())
      .then(json => res.send(json))
      .catch(next);
  });
