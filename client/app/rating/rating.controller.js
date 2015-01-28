'use strict';

angular.module('stockcharityApp')
  .controller('RatingCtrl', function($scope, $http, underscore, socket, $stateParams, Auth, Charity, Stock, Result) {
    var U = underscore;
    $scope.itemType = $stateParams.itemtype || 'charity';
    var Items = '';
    switch ($scope.itemType) {
      case "charity":
        Items = Charity;
        break;
      case "stock":
        Items = Stock;
        break;
      default:
        Items = Charity;
    }
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.items = [];
    $scope.cats = [];
    $scope.active = true;
    $scope.uid = $stateParams.uid || '-';
    //$scope.uid = Date.now();
    $scope.sid = $stateParams.sid || '-';
    $scope.cid = $stateParams.cid || '-';
    $scope.selected = $stateParams.selected || "";
    $scope.selectedItem = {
      selected: ''
    };
    $scope.oneAtATime = true;
    $scope.ratingIncrement = 5;
    $scope.rankingLowerBound = 70;
    $scope.rankingUpperBound = 100;
    var currentLowerBound = $scope.rankingLowerBound;
    var ratingGroups = ($scope.rankingUpperBound - $scope.rankingLowerBound) / $scope.ratingIncrement;
    $scope.starttime = Date.now();
    $scope.items = Items.query(function(resp) {
      $scope.groupedByCategory = U.groupBy(resp, function(el) {
        return el.category;
      }); //groupedByCategory
      U.each($scope.groupedByCategory, function(el) {
        el.open = false;
      });
      //need to check if Selected exists here
      $scope.groupedByCategory[$scope.selected] ? $scope.groupedByCategory[$scope.selected].open = true : "";
      U.each(U.shuffle(resp), function(item, index) {
        index = index + 1;
        item.rating = U.random(currentLowerBound + 1, currentLowerBound + $scope.ratingIncrement);
        if (index % 3 === 0) {
          currentLowerBound = currentLowerBound + $scope.ratingIncrement;
        }
      }); //each
      $scope.groupedByRating = {};
      for (var i = 1; i < (30 / $scope.ratingIncrement) + 1; i++) {
        var keyvalue = (i * $scope.ratingIncrement) + 70;
        $scope.groupedByRating[keyvalue - ($scope.ratingIncrement - 1) + ' - ' + keyvalue] = underscore.filter($scope.items, function(el) {
          return ((el.rating <= keyvalue) && (el.rating > (keyvalue) - $scope.ratingIncrement));
        }); //filter
      } //for
    }); //query


    socket.syncUpdates('charity', $scope.items);
    socket.syncUpdates('stock', $scope.items);
    $scope.myresults = {};
    $scope.myresults.sid = $scope.sid;
    $scope.myresults.uid = $scope.uid;
    $scope.myresults.cid = $scope.cid;
    $scope.myresults.clicks = [];
    $scope.myresults.submit = {};
    $scope.clickTrack = function(event, key) {
      $scope.myresults.clicks.push({
        click: key,
        date: Date.now()
      });
    }; //clickTrack

    $scope.submitIt = function submitIt() {
      $scope.clicks = $scope.myresults.clicks;
      $scope.myresults.starttime = $scope.starttime;
      $scope.myresults.viewType = 'By Rating';
      $scope.myresults.objectType = $scope.itemType;
      $scope.myresults.initCategory = $scope.selected;
      $scope.myresults.starttime = $scope.starttime;
      $scope.myresults.response = {
        choice: $scope.selectedItem.selected.name,
        rating: $scope.selectedItem.selected.rating,
        category: $scope.selectedItem.selected.category,
      };
      $scope.myresults.ratings = U.map($scope.items, function(elem) {
        return {
          name: elem.name,
          rating: elem.rating
        }
      });
      $scope.active = false;
      new Result($scope.myresults).$save();
      setInterval(function() { parent.postMessage({status: 'ok'},"*"); console.log("ok")},1000);
    };

  });
