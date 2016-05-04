(function() {

  (function() {

    var testHttp = angular.module('testHttp', []);

    testHttp.factory('httpResponseErrorInterceptor', function($q, $injector) {
      var retries = 0;

      return {
        'responseError': function(response) {
          if (response.status === 500 && ++retries < 3) {
            //TODO add timeout, increment exponentially
            // var $timeout = $injector.get('$timeout');
            // return $timeout(function() {
            //   var $http = $injector.get('$http');
            //   return $http(response.config);
            // }, 0);
            //http://stackoverflow.com/questions/32588822/retry-failed-requests-with-http-interceptor
            var $http = $injector.get('$http');
            return $http(response.config);
          }
          return $q.reject(response);
        }
      };
    });

    testHttp.config(function($httpProvider) {
      $httpProvider.interceptors.push('httpResponseErrorInterceptor');
    });

  })();

  (function() {

    describe('test retries on $http service', function() {

      var $http, $httpBackend, $timeout;

      beforeEach(module('testHttp'));

      beforeEach(inject(function(_$http_, _$httpBackend_, _$timeout_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
      }));

      it('does not retry on success', function(done) {
        $httpBackend.expectGET('/api/test').respond(200, 'the response');

        $http({
          method: 'GET',
          url: '/api/test'
        }).then(function(response) {
          expect(response.data).toBe('the response');
          done();
        }, function(response) {
          fail('should not have executed failure callback');
          done();
        });

        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $timeout.flush();
      });

      it('can succeed after one failed http call', function(done) {
        $http({
          method: 'GET',
          url: '/api/test'
        }).then(function(response) {
          expect(response.data).toBe('the response two');
          done();
        }, function(response) {
          fail('should not have executed failure callback');
          done();
        });

        $httpBackend.expectGET('/api/test').respond(500, 'the response');
        $httpBackend.expectGET('/api/test').respond(200, 'the response two')
        $httpBackend.flush();
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('can succeed after two failed http calls', function(done) {
        $http({
          method: 'GET',
          url: '/api/test'
        }).then(function(response) {
          expect(response.data).toBe('the response two');
          done();
        }, function(response) {
          fail('should not have executed failure callback');
          done();
        });

        $httpBackend.expectGET('/api/test').respond(500, 'the response');
        $httpBackend.expectGET('/api/test').respond(500, 'the response');
        $httpBackend.expectGET('/api/test').respond(200, 'the response two');

        $httpBackend.flush();
        $httpBackend.flush();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('fails after three failed http calls', function(done) {
        $http({
          method: 'GET',
          url: '/api/test'
        }).then(function(response) {
          fail('should not have executed success callback');
          done();
        }, function(response) {
          expect(response.data).toBe('the failed response');
          done();
        });

        $httpBackend.expectGET('/api/test').respond(500, 'the response');
        $httpBackend.expectGET('/api/test').respond(500, 'the response two');
        $httpBackend.expectGET('/api/test').respond(500, 'the failed response');

        $httpBackend.flush();
        $httpBackend.flush();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

    });

  })();

})();
