var app = angular.module('app');

app.controller('forsaleitemCtrl', function($scope, $rootScope, $state, Item, Auth, $localStorage) {
  $rootScope.user = $localStorage.token; 

  Item.getAllItems()
  .then(function(res){
    $scope.items = res.data; 
    $scope.category = $state.params.type;
  });

  $scope.goToShowroom = function() {
    $state.go('showroom');
  }
});