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
      console.log('data: ', data);
      $localStorage.token = data; 
      $rootScope.user = data;
      $state.go('profile');
    },
    function err(err) {
      swal("Invalid Password or Username");
    });
  }

  $scope.logout = function() {
    Auth.logout();
    $rootScope.user = null;
  }
});
