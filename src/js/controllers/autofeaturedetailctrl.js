var app = angular.module('app');

app.controller('autofeaturedetailCtrl', function($scope, $rootScope, $state, $stateParams, Autofeature, $localStorage) {
  $rootScope.user = $localStorage.token; 

  Autofeature.getAutofeature($state.params.autofeatureId)
  .then(function(res) {
    $scope.autofeatureDetails = res.data; 
  });
});