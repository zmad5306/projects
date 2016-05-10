(function() {
  describe('mock http', function() {
    it('should call mock API', function() {

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
      expect(element(by.id('data')).getText()).toBe('{"foo":"bar"}');
    });
  });
})();
