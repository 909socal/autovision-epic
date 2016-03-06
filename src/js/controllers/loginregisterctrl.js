app.controller('loginregisterCtrl', function($scope, $state, Auth, $localStorage, $rootScope) {
  // $scope.user = Auth.user(); 
  console.log("Auth.data: \n", Auth.data);
  // $scope.user = $localStorage.token; 
  // $rootScope.user = Auth.data; 
  $rootScope.user = $localStorage.token; 
  // $scope.user = $rootScope.user;

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

    // $scope.user = Auth.login(user); 
    Auth.login(user)
    .then((data)=>{
      this.token = data;
      console.log("AUTHSERVICE LOGIN TOKEN", data);
      $localStorage.token = this.token;
      // ^ The Token contains the user's password, unhashed. Is this normal? Perhaps only the current user will only see it if they look into it. If there's a chance for other users to get other users' passwords, this may be something to look into. 
      $rootScope.user = data; 
      // $scope.user = $rootScope.user;
      $state.go('profile');
      // return data;
      // return true;
    },
    function err(err) {
      console.log('inside err', err);
    });
  }

  $scope.logout = function() { 
    Auth.logout();
    $rootScope.user = null; 
    // $scope.user = null; 
  }
});

