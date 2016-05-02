(function() {
	'use strict';
	angular.module('portfolio-app', ['ngRoute', 'portfolio-summary-app'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/portfolio/summary', {
					templateUrl: '/portfolio/summary/summary.tmpl.html',
					controller: 'summaryCtrl',
					controllerAs: 'ctrl'
				})
				.otherwise({redirectTo: '/portfolio/summary'});
		}]);
})();
