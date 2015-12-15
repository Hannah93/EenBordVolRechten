angular.module('LeerkrachtPresentatieOpenCtrl', []).controller('LeerkrachtPresentatieOpenController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  document.body.style.background = "#D8D8D8"

  $scope.getAnswers=function(){
    $http.get('/api/antwoordData/' + $scope.lesID +'/' + $scope.vraag._id)
        .success(function(data) {
              $scope.antwoorden = data;
            console.log($scope.antwoorden);
        });
      };



}]);
