'use strict';

angular.module('stockcharityApp')
  .controller('NavbarCtrl', function($scope, $location, Auth) {

    $scope.$watch('getCurrentUser', function(newValue, oldValue) {
      // console.log(newValue);
      $scope.getCurrentUser = newValue;
    });
    

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.menu = [{
      title: 'Results',
      link: '/result'
    }, {
      title: 'Charities',
      link: '/charities'
    }, {
      title: 'Stocks',
      link: '/stocks'
    }, {
      title: 'Category Stocks',
      link: '/category?itemtype=stock&uid=' + $scope.getCurrentUser().name + '&sid=testsession'
    }, {
      title: 'Category Charity',
      link: '/category?itemtype=charity&uid=' + $scope.getCurrentUser().name + '&sid=testsession'
    }, {
      title: 'Rating Stocks',
      link: '/rating?itemtype=stock&uid=' + $scope.getCurrentUser().name + '&sid=testsession'
    }, {
      title: 'Rating Charity',
      link: '/rating?itemtype=charity&uid=' + $scope.getCurrentUser().name + '&sid=testsession'
    }, ];
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
