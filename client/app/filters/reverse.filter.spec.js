'use strict';

describe('Filter: reverse', function () {

  // load the filter's module
  beforeEach(module('stockcharityApp'));

  // initialize a new instance of the filter before each test
  var reverse;
  beforeEach(inject(function ($filter) {
    reverse = $filter('reverse');
  }));

  it('should return the input prefixed with "reverse filter:"', function () {
    var text = [1,2,3];
    expect(reverse(text)).toBe([3,2,1]);
  });

});
