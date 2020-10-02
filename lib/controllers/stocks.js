const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Stock = require('../models/stock');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Stock
      .insert({ ...req.body, userId: req.user.userId })
      .then(stock => res.send(stock))
      .catch(next);
  });

