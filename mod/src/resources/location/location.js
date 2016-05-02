(function() {
	'use strict';
	angular.module('location-app', [])
		.factory('locationService', locationService);

		locationService.$inject = ['$window'];

		function locationService($window) {
			/*jshint validthis: true */
			var self = this;

			self.getBaseUrl = function() {
				return "http://" + $window.location.host;
			};

			self.navigate = function(path, relative) {
				var url;
				if (relative) {
					url = path;
				}
				else {
					url = self.getBaseUrl() + path;
				}

				$window.location.href = url;
			};

			return {
				getBaseUrl: self.getBaseUrl,
				navigate: self.navigate
			};
		}
})();
