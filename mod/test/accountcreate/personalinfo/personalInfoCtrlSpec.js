describe('personalInfoCtrl', function(){
    beforeEach(module('accountcreate-personalinfo-app'));

    describe('saveInfo',function() {

        var location;
        var controller;
        var firstName = 'Bob';
        var lastName = 'Builder';

        beforeEach(inject(function($location, $controller){
            location = $location;

            controller = $controller('personalInfoCtrl', {$location: location});
        }));

        it('Should set first and last name', function(){
            controller.firstName = firstName;
            controller.lastName = lastName;

            expect(controller.firstName).toBe(firstName);
            expect(controller.lastName).toBe(lastName);
        });

        it('navigate to account create credentials route', function(){
            spyOn(location, 'path');

            controller.saveInfo();

            expect(location.path).toHaveBeenCalledWith('/accountcreate/credentials');
        });

    });

});
