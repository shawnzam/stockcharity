'use strict';

describe('Service: Charity', function () {

  // load the service's module
  beforeEach(module('stockcharityApp'));

  // instantiate service
  var Charity;
  beforeEach(inject(function (_Charity_) {
    Charity = _Charity_;
  }));

  it('should do something', function () {
    expect(!!Charity).toBe(true);
  });

});
