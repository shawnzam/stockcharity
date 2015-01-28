'use strict';

  angular.module('stockcharityApp').factory('Charity', function($resource) {
    return $resource('/api/charities/:id', { id: '@_id' }, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });
  });
