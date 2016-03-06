app.controller('navCtrl', function($scope, Auth, $localStorage, $rootScope) {
  $rootScope.user = $localStorage.token; 

  $scope.logout = function() { 
    Auth.logout();
    $rootScope.user = null; 
  }
});



