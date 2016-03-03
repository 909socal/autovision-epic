var app = angular.module('app');

app.controller('forsaleCtrl', function($scope, $state, $rootScope, Item) {
  $scope.goToState = function(category) {
    $rootScope.category = category;
    $state.go('forsaleitem');
  }
});