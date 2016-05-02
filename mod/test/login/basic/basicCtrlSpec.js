describe('basicCtrl', function(){
    beforeEach(module('login-basic-app'));

    describe('loginBasic',function() {

        var location;
        var controller;

        beforeEach(inject(function($location, $controller){
            location = $location;
            controller = $controller('basicCtrl', {$location: location});
        }));

        it('should navigate to otac route with valid credentials', function(){
            spyOn(location, 'path');

            controller.username = 'user';
            controller.password = 'password';

            controller.loginBasic();

            expect(controller.error).toBe("");
            expect(location.path).toHaveBeenCalledWith('/login/otac');
        });

        it('should not navigate to otac route with invalid username', function(){
            spyOn(location, 'path');
            location.path.calls.reset();

            controller.username = 'userrrrr';
            controller.password = 'password';

            controller.loginBasic();

            expect(controller.error).toBe("Invalid credentials");
            expect(location.path.calls.any()).toBe(false);
        });

        it('should not navigate to otac route with invalid password', function(){
            spyOn(location, 'path');
            location.path.calls.reset();

            controller.username = 'user';
            controller.password = 'passworddd';

            controller.loginBasic();

            expect(controller.error).toBe("Invalid credentials");
            expect(location.path.calls.any()).toBe(false);
        });

        it('should not navigate to otac route with invalid user & password', function(){
            spyOn(location, 'path');
            location.path.calls.reset();

            controller.username = 'userrrr';
            controller.password = 'passworddd';

            controller.loginBasic();

            expect(controller.error).toBe("Invalid credentials");
            expect(location.path.calls.any()).toBe(false);
        });

    });

});
