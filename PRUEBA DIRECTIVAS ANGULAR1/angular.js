var app = angular.module("myApp",['ui.router']);

app.directive("prueba", function(){
  return {
      retrict: 'A',
      templateUrl: 'template.html'
  };
});

app.controller("myController", function($scope, $http, beerService){
  $scope.beers = [];

  $scope.getBeers =  function (){
    beerService.getBeers().then(function(response){
      $scope.beers =  response.data;
        localStorage.setItem("beers",JSON.stringify($scope.beers)); // guarda datos en session
    })
  }
  if(localStorage.hasOwnProperty("beers") ){
    $scope.beers = JSON.parse(localStorage.getItem("beers"));
  }else{
    $scope.getBeers();//ejecturo la funcion
  }

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
