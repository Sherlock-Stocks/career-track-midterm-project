const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Stock = require('../models/stock');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Stock
      .insert({ ...req.body, userId: req.user.userId })
      .then(stock => res.send(stock))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Stock
      .findStockById(req.params.id)
      .then(stock => res.send(stock))
      .catch(next);
  })

  .get('/portfolio/:id', ensureAuth, (req, res, next) => {
    Stock
      .findStocksByUserId(req.params.id)
      .then(stock => res.send(stock))
      .catch(next);
  })

  .put('/:id', ensureAuth, (req, res, next) => {
    Stock
      .updateStockById(req.params.id, req.body)
      .then(stock => res.send(stock))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Stock
      .deleteStockById(req.params.id)
      .then(stock => res.send(stock))
      .catch(next);
  })
