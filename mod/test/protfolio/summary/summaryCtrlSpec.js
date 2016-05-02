describe('summaryCtrl', function(){
    beforeEach(module('portfolio-summary-app'));

    describe('protfolioSummary',function() {

        var location;
        var controller;

        beforeEach(inject(function($controller){
            controller = $controller('summaryCtrl', {});
        }));

        it('should have correct balance and username', function(){
            expect(controller.securityBalance).toBe(100000);
            expect(controller.username).toBe('user');
        });

    });

});
