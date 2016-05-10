(function() {
  describe('mock http', function() {
    it('should call mock API', function() {

      //mock http backend, wrap our module in new module below
      //that provides mocked back end
      //ngMockE2E is provied by angular-mocks
      //requires anglar-mocks to be imported into the application...
      //it'll need removed at build time
      browser.addMockModule('httpBackendMock',
        function() {
            angular.module('httpBackendMock',
           ['protractor-mock-http', 'ngMockE2E'])
            .run(function($httpBackend) {
                $httpBackend.whenGET('data.json').respond('{"neat":"stuff"}');
            });
        });


      browser.get('/');
      element(by.buttonText('Submit')).click();
      //file has {"foo":"bar"}
      expect(element(by.id('data')).getText()).toBe('{"neat":"stuff"}');
    });
  });
})();
