(function() {
	'use strict';
	angular.module('login-app', ['ngRoute', 'resources-app', 'login-basic-app', 'login-otac-app'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/login/basic', {
					templateUrl: '/login/basic/basic.tmpl.html',
					controller: 'basicCtrl',
					controllerAs: 'ctrl'
				})
				.when('/login/otac', {
					templateUrl: '/login/otac/otac.tmpl.html',
					controller: 'otacCtrl',
					controllerAs: 'ctrl'
				})
				.otherwise({redirectTo: '/login/basic'});
		}]);
})();
