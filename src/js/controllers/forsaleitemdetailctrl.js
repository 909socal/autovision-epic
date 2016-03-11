var app = angular.module('app');

app.controller('forsaleitemdetailCtrl', function($scope, $rootScope, $state, $stateParams, Item, $localStorage) {
  console.log('in forSaleItemDetailCtrl', $state.params.itemId);
  $rootScope.user = $localStorage.token; 

  Item.getItem($state.params.itemId)
  .then(function(res) {
    console.log('item is', res.data);
    console.log('AWS URL is: ', res.data.image.url);
    console.log('make: ', res.data.make);
    console.log('year: ', res.data.year);

    $scope.imageURL = res.data.image.url;
    $scope.itemDetails = res.data; 
    //$scope.mainImg = $scope.itemDetails.image.data;
  });
});