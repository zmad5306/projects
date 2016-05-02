(function() {
	'use strict';
	angular.module('portfolio-summary-app', [])
		.controller('summaryCtrl', summaryCtrl);

	function summaryCtrl() {
		  /*jshint validthis: true */
			var self = this;

			self.securityBalance = 100000;
			self.username = 'user';
		}
})();
