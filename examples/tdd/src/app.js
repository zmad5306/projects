var todo = angular.module('todo', []);
todo.controller('TodoController', [function() {
  var self = this;
  self.todos = ['one', 'two', 'three'];
}]);
