(function() {
	'use strict';
	angular.module('accountcreate-personalinfo-app', [])
		.controller('personalInfoCtrl', personalInfoCtrl);

		personalInfoCtrl.$inject = ['$location'];

		function personalInfoCtrl($location) {
			/*jshint validthis: true */
			var self = this;

			self.saveInfo = function() {
				$location.path('/accountcreate/credentials');
			};

		}
})();
