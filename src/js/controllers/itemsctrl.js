var app = angular.module('app');

app.controller('itemsCtrl', function($scope, $rootScope, $localStorage, Item) {
  $rootScope.user = $localStorage.token; 

  $scope.getAllItemsClick = function() {
    Item.getAllItems()
    .then(function(res){
    })
  }
});