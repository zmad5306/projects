describe('locationService', function(){

    var $window, service;

    beforeEach(module('location-app'));

    beforeEach(function() {
      $window = {location: { replace: jasmine.createSpy()} };

      module(function($provide) {
        $provide.value('$window', $window);
      });

      inject(function($injector) {
        service = $injector.get('locationService');
      });
    });

    //it('should get base url from window service', function(){
    //    expect(service.getBaseUrl()).toBe('http://localhost:9876');
    //});

    //it('should set url to correct path including base url', function(){
    //   service.navigate('/foo');
    //   expect($window.location.replace).toHaveBeenCalledWith('http://localhost:9876/foo');
    //});

});
