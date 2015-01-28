'use strict';


angular.module('stockcharityApp').factory('Result', function($resource) {
  return $resource('/api/results/:id', {id: '@_id'}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    },
    findByUid: {method:'GET', url: '/api/results/uid/:uid', isArray:true},
    findBySid: {method:'GET', url: '/api/results/sid/:sid', isArray:true},
    sids: {method:'GET', url: '/api/results/sids/all', isArray:true},
    csv: {method:'GET', url: '/api/results/csv/:sid', isArray:true}
  });
});
