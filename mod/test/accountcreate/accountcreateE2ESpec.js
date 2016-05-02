describe('account create', function() {
  it('should accept valid input', function() {
    browser.get('http://localhost:8080/accountcreate/accountcreate.html');

    element(by.model('ctrl.firstname')).sendKeys('bob');
    element(by.model('ctrl.lastname')).sendKeys('builder');
    element(by.css('[value="Submit"]')).click();

    element(by.model('ctrl.username')).sendKeys('user');
    element(by.model('ctrl.password')).sendKeys('pass');
    element(by.css('[value="Submit"]')).click();

    element(by.model('ctrl.username')).sendKeys('user');
    element(by.model('ctrl.password')).sendKeys('password');
    element(by.css('[value="Submit"]')).click();

    element(by.model('ctrl.otac')).sendKeys('123456789');
    element(by.css('[value="Submit"]')).click();

    expect(element(by.tagName("p")).getText()).toEqual('Welcome user your security balance is $100,000.00!');
  });
});
