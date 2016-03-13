var app = angular.module('app');

app.controller('forsaleitemCtrl', function($scope, $rootScope, $state, Item, Auth, $localStorage) {
  $rootScope.user = $localStorage.token;

  Item.getAllItems()
  .then(function(res){
    $scope.items = res.data;
    var title = $state.params.type;
    $scope.category = title;
    //console.log('category:', $scope.category);
    $scope.title = title.charAt(0).toUpperCase() + title.slice(1);
  });

  $scope.goToShowroom = function() {
    $state.go('showroom');
  }
});
