'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CharitySchema = new Schema({
  name: String,
  info: String,
  category: String,
  active: Boolean
});

module.exports = mongoose.model('Charity', CharitySchema);
