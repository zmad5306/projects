(function() {
	'use strict';
	angular.module('accountcreate-app', ['ngRoute', 'resources-app', 'accountcreate-credentials-app', 'accountcreate-personalinfo-app'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/accountcreate/personalinfo', {
				templateUrl: '/accountcreate/personalinfo/personalinfo.tmpl.html',
				controller: 'personalInfoCtrl',
				controllerAs: 'ctrl'
			})
			.when('/accountcreate/credentials', {
				templateUrl: '/accountcreate/credentials/credentials.tmpl.html',
				controller: 'credentialsCtrl',
				controllerAs: 'ctrl'
			})
			.otherwise({redirectTo: '/accountcreate/personalinfo'});
	}]);
})();
