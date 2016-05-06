(function(){
  var m = angular.module('scrollInvalid', []);

  m.controller('submitController', [function() {
    var self = this;
    self.test = 'some data';
    self.submit = function() {
      console.log('Submitted!!!!');
      console.log(self.element1);
    };
  }]);

  m.directive('ngSubmit', [function() {
    return {
        require: "?form",
        priority: -10,
        link: function(scope, element, attrs, form) {
          element.on("submit", function(event) {
            console.log('Form submitted!!!!');

            if (form && !form.$valid) {
              event.stopImmediatePropagation();
              event.preventDefault();

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
