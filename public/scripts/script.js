console.log('in script');

var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  console.log('in angular');
  var key;
  $scope.key = function(){
    $http({
      method: 'GET',
      url: '/key'
    }).then(function(response){
      key = response.data;
      console.log(key);
      $scope.apiCall();
    });
  };
  $scope.apiCall = function(){
    $http({
      method: 'GET',
      url: 'https://animalrestapi.azurewebsites.net/Animal/List?candidateID=' + key + '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(response){
      $scope.animals = response.data.list;
      console.log($scope.animals);
    });
  };
  $scope.createAnimal = function(){
    var animalToSend = {
      commonName: $scope.commonName,
      scientificName: $scope.scientificName,
      family: $scope.family,
      url: $scope.url
    };
    console.log(animalToSend);
  };
$scope.key();
}]);
