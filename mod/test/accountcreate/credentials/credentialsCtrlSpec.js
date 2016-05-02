describe('credentialsCtrl', function(){
    beforeEach(module('accountcreate-credentials-app'));

    describe('saveInfo',function() {

        var controller;
        var username = 'user';
        var password = 'password';
        var mockLocationService = {
            navigate: function(){}
        };

        beforeEach(function () {
          module(function ($provide) {
            $provide.value('locationService', mockLocationService);
          });
        });

        beforeEach(inject(function($controller){
            controller = $controller('credentialsCtrl', {});
        }));

        it('Should set username and password', function(){
            controller.username = username;
            controller.password = password;

            expect(controller.username).toBe(username);
            expect(controller.password).toBe(password);
        });

         it('Should reidrect to login', function(){
            spyOn(mockLocationService, 'navigate');

            controller.saveInfo();

            expect(mockLocationService.navigate).toHaveBeenCalledWith('/login', true);
        });

    });

});
