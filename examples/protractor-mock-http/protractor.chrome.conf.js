exports.config = {
 chromeOnly: true,
 chromeDriver: 'C:/Users/Zach/Desktop/Projects/examples/protractor-mock-http/node_modules/chromedriver/lib/chromedriver/chromedriver.exe',
 capabilities: {
   'browserName': 'chrome'
 },
 specs: ['**/*.e2e.spec.js'],
 baseUrl: 'http://localhost:8083/',
 directConnect: true
};
