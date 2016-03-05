var app = angular.module('app');

app.controller('forsaleCtrl', function($scope, $state, $localStorage, $rootScope, Item) {
  // $scope.user = $localStorage.token; 
  $rootScope.user = $localStorage.token; 
  // $scope.user = $rootScope.user;
  
  $scope.goToState = function(category) {
    $rootScope.category = category;
    $state.go('forsaleitem');
  }
});