var app= angular.module("beerApp",[]);

app.controller("beerController",function beerController($scope, $http, beerService){
  $scope.beers = [];
  $scope.beerEdit = {};
  $scope.paginaActual = 1;

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

  $scope.openModal = function(id){
    var found =  $scope.beers.filter(function(elem){ // se agrega un  var found porque  filter devuelve un arreglo
      return elem.id == Number(id);
    })
    $scope.beerEdit = found[0];

    $(".modal-editar").modal("show");
  }

  $scope.updateBeer = function(){
    var id = $scope.beerEdit.id;
    $scope.beers.forEach(function(elem, i){
      if(elem.id == id){
        $scope.beers[i].name = $scope.beerEdit.name;
        $scope.beers[i].description = $scope.beerEdit.description;
        $scope.beers[i].first_brewed = $scope.beerEdit.first_brewed;
      }
    })
    localStorage.setItem("beers",JSON.stringify($scope.beers));
    $scope.closeModal();
  }

  $scope.dropBeer = function(id){
    $scope.beers = $scope.beers.filter(function(elem){
      return elem.id !== id;
    })
  }

  $scope.closeModal = function(){
    $(".modal-editar").modal("hide");
    $scope.beerEdit={};
  }

  $scope.buscar= function(){
    if($scope.codigo == ""){
      $scope.beers = JSON.parse(localStorage.getItem("beers"));
    }else{
      $scope.beers = JSON.parse(localStorage.getItem("beers"));
      $scope.beers = $scope.beers.filter(function(elem){
        return elem.id == Number($scope.codigo);
      })
    }

  }

  $scope.paginate = function(pag){
    if($scope.paginaActual != pag){
      $scope.paginaActual = pag;
      var url = "https://api.punkapi.com/v2/beers?page="+$scope.paginaActual+"&per_pages=25"
      beerService.paginate(url).then(function(response){
        $scope.beers = response.data
      })
    }
    return
  }

})

app.factory("beerService", function($http){
  function paginate(url){
    return $http.get(url)
  }

  function getBeers(){
    return $http.get("https://api.punkapi.com/v2/beers")
  }

  return {paginate: paginate, getBeers: getBeers}

})
