'use strict';

var _ = require('lodash');
var Charity = require('./charity.model');

// Get list of charitys
exports.index = function(req, res) {
  Charity.find(function (err, charitys) {
    if(err) { return handleError(res, err); }
    return res.json(200, charitys);
  });
};

// Get a single charity
exports.show = function(req, res) {
  Charity.findById(req.params.id, function (err, charity) {
    if(err) { return handleError(res, err); }
    if(!charity) { return res.send(404); }
    return res.json(charity);
  });
};

// Creates a new charity in the DB.
exports.create = function(req, res) {
  Charity.create(req.body, function(err, charity) {
    if(err) { return handleError(res, err); }
    return res.json(201, charity);
  });
};

// Updates an existing charity in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Charity.findById(req.params.id, function (err, charity) {
    if (err) { return handleError(res, err); }
    if(!charity) { return res.send(404); }
    var updated = _.merge(charity, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, charity);
    });
  });
};

// Deletes a charity from the DB.
exports.destroy = function(req, res) {
  Charity.findById(req.params.id, function (err, charity) {
    if(err) { return handleError(res, err); }
    if(!charity) { return res.send(404); }
    charity.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}