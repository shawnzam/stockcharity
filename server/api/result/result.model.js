'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResultSchema = new Schema({
  uid: String,
  sid: String,
  cid: String,
  viewType: String,
  objectType: String,
  initCategory: String,
  updated: { type: Date, default: Date.now },
  clicks: Schema.Types.Mixed,
  ratings: Schema.Types.Mixed,//TODO make this a reference
  response: Schema.Types.Mixed,
  starttime: Date,
  active: Boolean
});

module.exports = mongoose.model('Result', ResultSchema);
