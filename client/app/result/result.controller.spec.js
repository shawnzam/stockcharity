'use strict';

describe('Controller: ResultCtrl', function () {

  // load the controller's module
  beforeEach(module('stockcharityApp'));

  var ResultCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResultCtrl = $controller('ResultCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
