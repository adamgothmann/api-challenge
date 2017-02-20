var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  var key;
  $scope.animals = [];
    $http({ //retrieves the api key from server.
      method: 'GET',
      url: '/key'
    }).then(function(response){
      key = response.data;
      console.log(key);
      $scope.apiCall();
    });

  $scope.apiCall = function(){ //requests the data from the api.
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
  };//end of apiCall

  $scope.createAnimal = function(){ //creates an animal and sends it to the database.
    $http({
      method: 'POST',
      url: 'https://animalrestapi.azurewebsites.net/Animal/Create?commonName=' + $scope.commonName + '&scientificName=' + $scope.scientificName + '&family=' + $scope.family + '&imageURL=' + $scope.imageURL + '&candidateID=' + key + '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    $scope.apiCall();
  };
  $scope.deleteAnimal = function(id, index){ //deletes an animal from the database.
    console.log(id);
    console.log(index);
    $scope.animals.splice(index, 1);
    $http({
      method: 'POST',
      url: 'https://animalrestapi.azurewebsites.net/Animal/Delete?id=' + id + '&candidateID=' + key + '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    $scope.apiCall();
  };
}]);
