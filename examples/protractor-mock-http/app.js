(function() {
  angular.module('protractor-mock-http', [])
    .controller('TestController', ['$http', function($http) {
      var self = this;
      self.sub = function() {
        $http({
          method: 'GET',
          url: 'data.json'
        }).then(function(response) {
          self.data = response.data;
        });
      };
    }]);
})();
