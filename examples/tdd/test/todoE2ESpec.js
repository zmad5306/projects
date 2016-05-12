describe('TODO Application Tests',function(){

  describe('smoke tests', function() {

    beforeEach(function() {
      browser.get('/');
    });

    it('should have title', function() {
      expect(browser.getTitle()).toEqual('TODO');
    });

  });


  describe('list tests', function() {

    beforeEach(function() {
      browser.get('/');
    });

    it('should have 3 items in list', function() {
      var todoListItems = element.all(by.repeater('todo in ctrl.todos'));
      expect(todoListItems.count()).toBe(3);
    });

    it('should have item: one', function() {
      var expected = ['one', 'two', 'three'];
      var todoListItems = element.all(by.repeater('todo in ctrl.todos')).each(function(element, index) {
        element.getText().then(function(text) {
          expect(expected).toContain(text);
        });
      });
    });

  });


  describe('done tests', function() {

    beforeEach(function() {
      browser.get('/');
    });

    it('should remove element from list when clicked', function() {
      var expected = ['two', 'three'];
      element(by.css('.item')).click();
      var todoListItems = element.all(by.repeater('todo in ctrl.todos')).each(function(element, index) {
        element.getText().then(function(text) {
          expect(expected).toContain(text);
        });
      });
    });
  });

});
