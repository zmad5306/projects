(function(){
  var m = angular.module('scrollInvalid', []);

  m.controller('submitController', [function() {
    var self = this;
    self.test = 'some data';
    self.submit = function() {
      console.log('Submitted!!!!');
      console.log(self.element0);
    };
  }]);

  m.directive('focusOnFirstInvalid', [function() {
    return {
        require: "?form",
        link: function(scope, element, attrs, form) {
          element.on("submit", function(event) {
            console.log('Form submitted!!!!');

            if (form && !form.$valid) {
              var firstInvalid = element[0].querySelector('.ng-invalid');
              console.log(firstInvalid);

              if (firstInvalid) {
                firstInvalid.focus();
              }

              console.log('Invalid form Submitted!!!!');
            }
          })
        }
      };
  }]);
}());
