app.controller('loginregisterCtrl', function($scope, Auth, $localStorage) {
  // $scope.user = Auth.user(); 
  $scope.user = $localStorage.token; 

  $scope.regClick = function(){
    if ($scope.regPass !== $scope.regPass2) {
      alert("Passwords not the same!"); 
      return; 
    };
    var user = {
      email: $scope.regEmail, 
      password: $scope.regPass, 
      username: $scope.regUsername 
    }
    Auth.register(user);
  }

  $scope.loginClick = function() { 
    var user = {
      email: $scope.logEmail, 
      password: $scope.logPass, 
      username: $scope.logUsername 
    }

    Auth.login(user); 
  }

  $scope.logout = function() { 
    Auth.logout();
    $scope.user = null; 
  }
});

