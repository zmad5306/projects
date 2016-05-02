(function() {
	'use strict';
	angular.module('accountcreate-credentials-app', [])
		.controller('credentialsCtrl', credentialsCtrl);

		credentialsCtrl.$inject = ['locationService'];

		function credentialsCtrl(locationService) {
			/*jshint validthis: true */
			var self = this;

			self.saveInfo = function() {
				locationService.navigate('/login', true);
			};
		}
})();
