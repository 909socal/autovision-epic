var app = angular.module('app');

app.controller('forsaleitemCtrl', function($scope, $rootScope, $state, Item, Auth, $localStorage) {
  // console.log('in forsaleitemsCtrl', $state.params)
  $rootScope.user = $localStorage.token; 

  Item.getAllItems()
  .then(function(res){
    $scope.items = res.data; 
    $scope.category=$state.params.type; //.charAt(0).toUpperCase() + $state.params.type.slice(1);
        // console.log('Hi', $scope.items);
  });

  $scope.goToShowroom = function() {
    console.log('gotoshowroom');
    $state.go('showroom');
  }
});