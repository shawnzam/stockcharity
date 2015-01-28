'use strict';

describe('Filter: pluckjoin', function () {

  // load the filter's module
  beforeEach(module('stockcharityApp'));

  // initialize a new instance of the filter before each test
  var pluckjoin;
  beforeEach(inject(function ($filter) {
    pluckjoin = $filter('pluckjoin');
  }));

  it('should return the input prefixed with "pluckjoin filter:"', function () {
    var text = 'angularjs';
    expect(pluckjoin(text)).toBe('pluckjoin filter: ' + text);
  });

});
