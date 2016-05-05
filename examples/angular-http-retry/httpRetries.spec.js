(function() {

    (function() {

        var testHttp = angular.module('testHttp', []);

        testHttp.factory('httpResponseErrorInterceptor', ['$q', '$injector', function($q, $injector) {
            //Angular docs for response interceptors
            //https://docs.angularjs.org/api/ng/service/$http#interceptors

            return {
                'responseError': function(response) {
                    if (response.config.retries === undefined) {
                        //first failure, init to zero
                        response.config.retries = 0;
                    }

                    if (++response.config.retries < 5) {
                        // have to use $injector to get $http provider it
                        // can't be injected by angular, it creates a circular dependency

                        var retryWaitTime = (Math.pow(2, response.config.retries) * 2000) + Math.floor(Math.random() * 2000);

                        var $timeout = $injector.get('$timeout');
                        return $timeout(function() {
                            var $http = $injector.get('$http');
                            return $http(response.config);
                        }, retryWaitTime);
                    }
                    return $q.reject(response);
                }
            };
        }]);

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

            it('does not retry on success (200)', function(done) {
                $httpBackend.expectGET('/api/test').respond(200, 'the response');

                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    expect(response.status).toBe(200);
                    expect(response.data).toBe('the response');
                    done();
                }, function(response) {
                    fail('should not have executed failure callback');
                    done();
                });

                $httpBackend.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('does not retry on success (299)', function(done) {
                $httpBackend.expectGET('/api/test').respond(299, 'the response');

                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    expect(response.status).toBe(299);
                    expect(response.data).toBe('the response');
                    done();
                }, function(response) {
                    fail('should not have executed failure callback');
                    done();
                });

                $httpBackend.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('can succeed after one failed http call', function(done) {
                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    expect(response.status).toBe(200);
                    expect(response.data).toBe('the response two');
                    done();
                }, function(response) {
                    fail('should not have executed failure callback');
                    done();
                });

                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $httpBackend.flush();

                $httpBackend.expectGET('/api/test').respond(200, 'the response two');
                $timeout.flush();

                $httpBackend.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('can succeed after two failed http calls', function(done) {
                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    expect(response.status).toBe(200);
                    expect(response.data).toBe('the response two');
                    done();
                }, function(response) {
                    fail('should not have executed failure callback');
                    done();
                });

                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $httpBackend.flush();

                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(200, 'the response two');
                $timeout.flush();

                $httpBackend.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('can succeed after three failed http calls', function(done) {
                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    expect(response.status).toBe(200);
                    expect(response.data).toBe('the response two');
                    done();
                }, function(response) {
                    fail('should not have executed failure callback');
                    done();
                });

                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $httpBackend.flush();

                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(200, 'the response two');
                $timeout.flush();

                $httpBackend.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('can succeed after four failed http calls', function(done) {
                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    expect(response.status).toBe(200);
                    expect(response.data).toBe('the response two');
                    done();
                }, function(response) {
                    fail('should not have executed failure callback');
                    done();
                });

                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $httpBackend.flush();

                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(200, 'the response two');
                $timeout.flush();

                $httpBackend.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('fails after five failed http calls', function(done) {
                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    fail('should not have executed success callback');
                    done();
                }, function(response) {
                    expect(response.status).toBe(500);
                    expect(response.data).toBe('the failed response');
                    done();
                });

                $httpBackend.expectGET('/api/test').respond(500, 'the response');
                $httpBackend.flush();

                $httpBackend.expectGET('/api/test').respond(500, 'the response two');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(500, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(500, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(500, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $timeout.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('fails after three failed (199) http calls', function(done) {
                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    fail('should not have executed success callback');
                    done();
                }, function(response) {
                    expect(response.status).toBe(199);
                    expect(response.data).toBe('the failed response');
                    done();
                });

                $httpBackend.expectGET('/api/test').respond(199, 'the response');
                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(199, 'the response two');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(199, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(199, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(199, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $timeout.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('fails after three failed (300) http calls', function(done) {
                $http({
                    method: 'GET',
                    url: '/api/test'
                }).then(function(response) {
                    fail('should not have executed success callback');
                    done();
                }, function(response) {
                    expect(response.status).toBe(300);
                    expect(response.data).toBe('the failed response');
                    done();
                });

                $httpBackend.expectGET('/api/test').respond(300, 'the response');
                $httpBackend.flush();

                $httpBackend.expectGET('/api/test').respond(300, 'the response two');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(300, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(300, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $httpBackend.expectGET('/api/test').respond(300, 'the failed response');
                $timeout.flush();

                $httpBackend.flush();
                $timeout.flush();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

        });

    })();

})();
