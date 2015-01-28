'use strict';

angular.module('stockcharityApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('result', {
        url: '/result?sid&uid',
        templateUrl: 'app/result/result.html',
        controller: 'ResultCtrl',
        authenticate: true
      });
  });
