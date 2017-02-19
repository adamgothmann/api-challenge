var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', '$window', function($scope, $http, $window){
  var key;
  $scope.animals = [];
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
      },
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
      imageURL: $scope.imageURL
    };
    console.log(animalToSend);
    //   url: 'https://animalrestapi.azurewebsites.net/Animal/Create',
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //   data: $.param({
    //     commonName: $scope.commonName,
    //     scientificName: $scope.scientificName,
    //     family: $scope.family,
    //     imageURL: $scope.imageURL,
    //     candidateID: key
    //   })
    $http({
      method: 'POST',
      url: 'https://animalrestapi.azurewebsites.net/Animal/Create?commonName=' + $scope.commonName + '&scientificName=' + $scope.scientificName + '&family=' + $scope.family + '&imageURL=' + $scope.imageURL + '&candidateID=' + key + '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    $scope.animals.push(animalToSend);
    $scope.apiCall();
  };
  $scope.deleteAnimal = function(id, index){
    console.log(id);
    console.log(index);
    $http({
      method: 'POST',
      url: 'https://animalrestapi.azurewebsites.net/Animal/Delete?id=' + id + '&candidateID=' + key + '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    $scope.animals.splice(1, 3);
    $scope.apiCall();
  };

  $scope.key();
}]);
