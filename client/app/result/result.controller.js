'use strict';

angular.module('stockcharityApp')
  .controller('ResultCtrl', function ($scope, $http, socket, underscore, Result, $stateParams) {
    var U = underscore;
    $scope.sids = Result.sids();
    $scope.sid = $stateParams.sid || '';
    $scope.results = Result.query(function(res) {
      var clicks = U.map($scope.results, function(elem) {
        return elem.clicks.length
      });
      $scope.maxClicks = U.max(clicks);
      $scope.clicks = U.map($scope.results, function(elem) {
        return elem.clicks
      });
    });//query
    socket.syncUpdates('result', $scope.results);
    $scope.reset = function() {
      $scope.results = Result.query(function(res) {
        var clicks = U.map($scope.results, function(elem) {
          return elem.clicks.length
        });
        $scope.maxClicks = U.max(clicks);
        $scope.clicks = U.map($scope.results, function(elem) {
          return elem.clicks
        });
      });//query
      $scope.sid = '';
      $scope.csv = '';
      socket.syncUpdates('result', $scope.results);
      $scope.sids = Result.sids();
    }

    $scope.updateResults= function() {
      $scope.results = Result.findBySid({sid: $scope.sid}, function(res) {
        var clicks = U.map($scope.results, function(elem) {
          return elem.clicks.length
        })
        $scope.maxClicks = U.max(clicks);
        $scope.clicks = U.map($scope.results, function(elem) {
          return elem.clicks
        })
      });//query
      $scope.csv = Result.csv({sid: $scope.sid}, function(res, err) {
        $scope.headers = U.map(res[0], function(value, key) {
          return key;
        });
      });
      $scope.sids = Result.sids();
    }

    $scope.getNumber = function(num) {
      if (num == '-Infinity'){
        return [];
      }
      return new Array(num);
    }

    $scope.deleteResult = function(result) {
      Result.remove({ id: result._id });
      $scope.sids = Result.sids();
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('results');
    });

  });
