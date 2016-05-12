exports.config = {
 chromeOnly: true,
 chromeDriver: 'C:/Users/Zach/AppData/Roaming/npm/node_modules/protractor/selenium/chromedriver',
 capabilities: {
   'browserName': 'chrome'
 },
 specs: ['test/**/*E2ESpec.js'],
 baseUrl: 'http://localhost:8080/'
};
