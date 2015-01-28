'use strict';

angular.module('stockcharityApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/category?itemtype&uid&sid&cid',
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
