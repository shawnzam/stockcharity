'use strict';

angular.module('stockcharityApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rating', {
        url: '/rating?itemtype&uid&sid&cid',
        templateUrl: 'app/rating/rating.html',
        controller: 'RatingCtrl'
      });
  });
