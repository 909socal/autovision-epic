var app = angular.module('app');

app.controller('autofeaturedetailCtrl', function($scope, $rootScope, $state, $stateParams, Autofeature, $localStorage) {
  $rootScope.user = $localStorage.token; 

  Autofeature.getAutofeature($state.params.autofeatureId)
  .then(function(res) {
    console.log('res.data is: ', res.data);
    // $scope.imageURL = res.data.image.url;
    $scope.autofeatureDetails = res.data; 
  });
});