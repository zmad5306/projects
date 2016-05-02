(function() {
	'use strict';
	angular.module('login-otac-app', [])
		.controller('otacCtrl', otacCtrl);

		otacCtrl.$inject = ['locationService'];

		function otacCtrl(locationService) {
			/*jshint validthis: true */
			var self = this;

			self.loginOtac = function() {
				if (self.otac === '123456789') {
					self.error = '';
					locationService.navigate('/portfolio', true);
				}
				else {
					self.error = 'Invalid credentials';
				}
			};
		}
})();
