app.controller('loginregisterCtrl', function($scope, Auth, $localStorage) {
  // $scope.$storage = $localStorage;
  // $scope.register = function(user){
  //   Auth.register(user);
  // };

  // $scope.login = function(user){
  //   Auth.login(user);
  // };
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
  }
});

// app.service('Auth', function($http, $state, $localStorage){
//   this.register = function(user){
//     console.log("IS DATA RIGHT?", user);
//     $http({method: 'POST', url: '/auth/register', data:user}).then(function success(data){
//       console.log(data);
//       $state.go('login');
//     },
//     function err(err){
//       console.log('Error:', err, 'error');
//     });
//   }
//   this.login = function(user){
//     return $http({method: 'POST', url: '/auth/login', data: user}).then((data)=>{
//       this.token = data;
//       $localStorage.token = this.token;
//       console.log(data);
//       $state.go('home');
//     },
//     function err(err){
//       console.log('Error:', err, 'error');
//     });
//   }

  // this.logout = () => {
  //   this.token = null;
  //   $localStorage.token = null;
  //   console.log('logout successful')
  // }
// });