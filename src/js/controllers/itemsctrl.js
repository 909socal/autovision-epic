var app = angular.module('app');

app.controller('itemsCtrl', function($scope, $state, Item, $rootScope, Auth, $localStorage) {
  $rootScope.user = $localStorage.token; 
  $scope.addItemClick = function() {
    Item.createItem($scope.item)
    .then(function(res){
      $state.go('forsale');
    });
  };

  $scope.getAllItemsClick = function() {
    Item.getAllItems()
    .then(function(res){
      console.log(res, 'Hi');
    })
  }

});