var app = angular.module('app');

app.controller('forsaleitemdetailCtrl', function($scope, $rootScope, $state, $stateParams, Item, $localStorage) {
  $rootScope.user = $localStorage.token; 

  Item.getItem($state.params.itemId)
  .then(function(res) {
    // $scope.imageURL = res.data.image.url;
    $scope.itemDetails = res.data; 
  });
});