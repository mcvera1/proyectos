var app = angular.module("myApp",['ui.router']);

app.directive("prueba", function(){
  return {
      retrict: 'A',
      templateUrl: 'template.html'
  };
});

app.controller("myController", function($scope){
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
