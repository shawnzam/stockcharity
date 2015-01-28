'use strict';

angular.module('stockcharityApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stocks', {
        url: '/stocks',
        templateUrl: 'app/stocks/stocks.html',
        controller: 'StocksCtrl',
        authenticate: true
      });
  });
