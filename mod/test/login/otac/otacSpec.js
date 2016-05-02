describe('otacCtrl', function(){
    beforeEach(module('login-otac-app'));

    describe('loginOtac',function() {

        var controller;
        var mockLocationService = {
            navigate: function(){}
        };

        beforeEach(function () {
          module(function ($provide) {
            $provide.value('locationService', mockLocationService);
          });
        });

        beforeEach(inject(function($location, $controller){
            controller = $controller('otacCtrl', {});
        }));

        it('should navigate to otac route with valid credentials', function(){
            spyOn(mockLocationService, 'navigate');

            controller.otac = '123456789';

            controller.loginOtac();

            expect(controller.error).toBe("");
            expect(mockLocationService.navigate).toHaveBeenCalledWith('/portfolio', true);
        });

        it('should not navigate to otac route with invalid username', function(){
            spyOn(mockLocationService, 'navigate');
            mockLocationService.navigate.calls.reset();

            controller.otac = '12345678';

            controller.loginOtac();

            expect(controller.error).toBe("Invalid credentials");
            expect(mockLocationService.navigate.calls.any()).toBe(false);
        });

    });

});
