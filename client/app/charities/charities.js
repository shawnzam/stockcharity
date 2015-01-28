'use strict';

angular.module('stockcharityApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('charities', {
        url: '/charities',
        templateUrl: 'app/charities/charities.html',
        controller: 'CharitiesCtrl',
        authenticate: true
      });
  });
