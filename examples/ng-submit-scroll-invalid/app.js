(function(){
  var m = angular.module('scrollInvalid', []);

  m.controller('submitController', [function() {
    var self = this;
    self.test = 'some data';
    self.submit = function() {
    };
  }]);

  m.directive('focusOnFirstInvalid', [function() {
    return {
        require: "?form",
        link: function(scope, element, attrs, form) {
          element.on("submit", function(event) {
            if (form && !form.$valid) {
              var firstInvalid = element[0].querySelector('.ng-invalid');

              if (firstInvalid) {
                firstInvalid.focus();
              }
            }
          })
        }
      };
  }]);
}());
