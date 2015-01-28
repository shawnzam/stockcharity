'use strict';

var express = require('express');
var controller = require('./result.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

//any one can create, but only admins can view, edit and delete
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.get('/sid/:sid', auth.isAuthenticated(), controller.sid);
router.get('/uid/:uid', auth.isAuthenticated(), controller.uid);
router.get('/sids/all', auth.isAuthenticated(), controller.sids);
router.get('/csv/:sid', auth.isAuthenticated(), controller.csv);
router.get('/selection/:uid/:sid/:cid', controller.selection);

module.exports = router;
