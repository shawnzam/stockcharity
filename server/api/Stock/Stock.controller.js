'use strict';

var _ = require('lodash');
var Stock = require('./Stock.model');

// Get list of Stocks
exports.index = function(req, res) {
  Stock.find(function (err, Stocks) {
    if(err) { return handleError(res, err); }
    return res.json(200, Stocks);
  });
};

// Get a single Stock
exports.show = function(req, res) {
  Stock.findById(req.params.id, function (err, Stock) {
    if(err) { return handleError(res, err); }
    if(!Stock) { return res.send(404); }
    return res.json(Stock);
  });
};

// Creates a new Stock in the DB.
exports.create = function(req, res) {
  Stock.create(req.body, function(err, Stock) {
    if(err) { return handleError(res, err); }
    return res.json(201, Stock);
  });
};

// Updates an existing Stock in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stock.findById(req.params.id, function (err, Stock) {
    if (err) { return handleError(res, err); }
    if(!Stock) { return res.send(404); }
    var updated = _.merge(Stock, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Stock);
    });
  });
};

// Deletes a Stock from the DB.
exports.destroy = function(req, res) {
  Stock.findById(req.params.id, function (err, Stock) {
    if(err) { return handleError(res, err); }
    if(!Stock) { return res.send(404); }
    Stock.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}