var app = angular.module('app');

app.controller('forsaleitemdetailCtrl', function($scope, $rootScope, $state, $stateParams, Item, $localStorage) {
  console.log('in forSaleItemDetailCtrl', $state.params.itemId);
  $rootScope.user = $localStorage.token; 

  Item.getItem($state.params.itemId)
  .then(function(res) {
    console.log('item is', res);
    $scope.itemDetails = res.data; 
  });
  
});