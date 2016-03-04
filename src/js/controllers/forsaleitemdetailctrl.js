var app = angular.module('app');

app.controller('forsaleitemdetailCtrl', function($scope, $rootScope, $state, $stateParams, Item) {
  console.log('in forSaleItemDetailCtrl', $state.params.itemId);

  Item.getItem($state.params.itemId)
  .then(function(res) {
    console.log('item is', res);
    $scope.itemDetails = res.data; 
  });
  
});