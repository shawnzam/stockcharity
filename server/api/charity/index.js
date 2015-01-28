'use strict';

var express = require('express');
var controller = require('./charity.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();
//any one can create, but only admins can view, edit and delete
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);


module.exports = router;
