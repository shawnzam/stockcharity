'use strict';

angular.module('stockcharityApp')
  .controller('CharitiesCtrl', function ($scope, $http, socket, underscore, Charity, dialogs) {
    $scope.charities = [];

    $scope.charities = Charity.query(function (res) {
      $scope.cats = updateCategories(res);
      $scope.cats = updateCategories($scope.charities);
    });

    socket.syncUpdates('charity', $scope.charities, function(){
      $scope.cats = updateCategories($scope.charities);
    });

    $scope.charity = new Charity();
    $scope.addCharity = function() {

      $scope.charity.$save(function(err) {
        $scope.charity = new Charity();
      });
    };

    $scope.launch = function(c) {
      var dlg = dialogs.confirm('Please Confirm', 'Are you absolutely sure you want to delete <strong>' + c.name + '</strong>?');
      dlg.result.then(function(btn){
        Charity.remove({ id: c._id });
      });
    }

    $scope.updateCharity = function(c) {
      Charity.update({ id:c._id }, c);
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('charities');
    });

    var updateCategories = function updateCategories(list) {
      var out = [];
      underscore.map(list, function(elem) {
        out.push(elem.category);
      });//map
      out = underscore.compact(underscore.uniq(out));
      return out;
    };
  });
