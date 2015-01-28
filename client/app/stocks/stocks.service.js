'use strict';

angular.module('stockcharityApp').factory('Stock', function($resource) {
  return $resource('/api/stocks/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});
