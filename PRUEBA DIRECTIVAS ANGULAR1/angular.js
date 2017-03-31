var app = angular.module("myApp",['ui.router','ngTable']);

app.directive("prueba", function(){
  return {
      retrict: 'A',
      templateUrl: 'template.html'
  };
});

app.controller("myController", function($scope, $http, NgTableParams){
  $scope.beers = [];

    $http.get("https://api.punkapi.com/v2/beers").then(function(response){
        $scope.beers =  response.data;
        localStorage.setItem("beers",JSON.stringify($scope.beers)); // guarda datos en session
        //  localStorage.setItem("beers",JSON.stringify($scope.beers)); // guarda datos en session
      })

      $scope.buscar= function(){
        if($scope.escriba == ""){
          $scope.beers = JSON.parse(localStorage.getItem("beers"));
        }else{
          $scope.beers = JSON.parse(localStorage.getItem("beers"));
          $scope.beers = $scope.beers.filter(function(elem){
            return elem.id == Number($scope.escriba);
          })
        }
      }

      $scope.tableParams = new NgTableParams({}, { dataset: $scope.beers});
  $scope.escriba;
});

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/eleccion1');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('eleccion1', {
            url: '/eleccion1',
            templateUrl: 'eleccion1.html'
        })

        // nested list with custom controller
        .state('eleccion2', {
            url: '/eleccion2',
            templateUrl: 'eleccion2.html',
        })

});

app.factory("beerService", function($http){
  function getBeers(){
    return $http.get("https://api.punkapi.com/v2/beers")
  }

})

function soloNumeros(e){
 var key = window.Event ? e.which : e.keyCode;
 return (key >= 48 && key <= 57)
}
