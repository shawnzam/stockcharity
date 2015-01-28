/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Charity = require('./charity.model');

exports.register = function(socket) {
  Charity.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Charity.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('charity:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('charity:remove', doc);
}