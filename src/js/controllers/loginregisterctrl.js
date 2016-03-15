app.controller('loginregisterCtrl', function($scope, $state, Auth, $localStorage, $rootScope) {

  $rootScope.user = $localStorage.token;

  $scope.regClick = function(){
    if ($scope.regPass !== $scope.regPass2) {
      swal("Passwords not the same!");
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

    Auth.login(user)
    .then((data)=>{
      this.token = data;
      $localStorage.token = this.token;
      $rootScope.user = data;
      $state.go('profile');
    },
    function err(err) {
      swal("Invalid Password or Username");
      console.log('inside err', err);
    });
  }

  $scope.logout = function() {
    Auth.logout();
    $rootScope.user = null;
  }
});
