'use strict';

angular.module('stockcharityApp')
  .filter('join', function() {
    return function(list, token) {
        // console.log(list);
      return (list||[]).join(' ' + token + ' ');
    }
  })

  .filter('pluck', function() {
    function pluck(objects, property) {
      if (!(objects && property && angular.isArray(objects))) return [];

      property = String(property).split(',');
      // console.log(property);
      return objects.map(function(object) {
        // just in case
        object = Object(object);
        var out = [];
        var thisout = [];
        for (var i = 0; i < property.length; i++) {
          var p = property[i].trim();
          if (object.hasOwnProperty(p)) {
            thisout.push(object[p]);
            
          }
      }
      out.push(thisout.join(' - '));

        return out;
      });
    }

    return function(objects, property) {
      return pluck(objects, property);
    }
  });
