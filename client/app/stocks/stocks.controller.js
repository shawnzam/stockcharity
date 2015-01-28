'use strict';


  angular.module('stockcharityApp')
  .controller('StocksCtrl', function ($scope, $http, socket, underscore, Stock, dialogs) {
    $scope.stocks = [];

    $scope.stocks = Stock.query(function (res) {
      $scope.cats = updateCategories(res);
      $scope.cats = updateCategories($scope.stocks);
    });

    socket.syncUpdates('Stock', $scope.stocks, function(){
      $scope.cats = updateCategories($scope.stocks);
    });

    $scope.stock = new Stock();
    $scope.addStock = function() {

      $scope.stock.$save(function(err) {
        $scope.stock = new Stock();
      });
    };

    $scope.launch = function(c) {
      var dlg = dialogs.confirm('Please Confirm', 'Are you absolutely sure you want to delete <strong>' + c.name + '</strong>?');
      dlg.result.then(function(btn){
        Stock.remove({ id: c._id });
      });
    }

    $scope.updateStock = function(c) {
      Stock.update({ id:c._id }, c);
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('stocks');
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
