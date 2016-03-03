var app = angular.module('app');

app.controller('forsaleCtrl', function($scope, $state, $localStorage, $rootScope, Item) {
  $scope.user = $localStorage.token; 
  
  $scope.goToState = function(category) {
    $rootScope.category = category;
    $state.go('forsaleitem');
  }
});