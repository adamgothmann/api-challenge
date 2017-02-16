console.log('in script');

var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  console.log('in angular');

  $http({
    method: 'GET',

  });
}]);
