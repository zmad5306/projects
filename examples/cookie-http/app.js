(function() {
  'use strict';

  angular.module('cookie', []);

  // angular.module('cookie').config(['$httpProvider', function($httpProvider) {
  //   $httpProvider.defaults.withCredentials = true;
  // }]);

  angular.module('cookie').controller('cookieController', ['$http', function($http) {

      var self = this;

      self.getData = function() {
        $http({
          method: 'GET',
          url: 'test'
        }).then(function(response) {
          console.log(response);
        });
      };

      self.sendData = function() {
        $http({
          method: 'POST',
          url: 'test'
          //,
          //withCredentials: true
        }).then(function(response) {
          console.log(response);
        });
      };

  }]);
})();
