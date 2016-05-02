(function() {
	'use strict';
	angular.module('login-basic-app', [])
		.controller('basicCtrl', basicCtrl);

		basicCtrl.$inject = ['$location'];

		function basicCtrl($location) {
			/*jshint validthis: true */
			var self = this;

			self.loginBasic = function() {
				if (self.username === 'user' && self.password === 'password') {
					self.error = '';
					$location.path('/login/otac');
				}
				else {
					self.error = 'Invalid credentials';
				}
			};

		}
})();
