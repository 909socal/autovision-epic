app.service('Auth', function($http, $state, $localStorage){
  this.register = function(user){
    console.log("user", user);
    $http({method: 'POST', url: '/users/register', data: user}).then(function success(data){
      console.log(data);
      $state.go('login');
    }, function err(err){
      console.log("error", err);
    });

    
  }
  // this.register = function(user){
  //   console.log("IS DATA RIGHT?", user);
  //   $http({method: 'POST', url: '/auth/register', data:user}).then(function success(data){
  //     console.log(data);
  //     $state.go('login');
  //   },
  //   function err(err){
  //     console.log('Error:', err, 'error');
  //   });
  // }
  // this.login = function(user){
  //   return $http({method: 'POST', url: '/auth/login', data: user}).then((data)=>{
  //     this.token = data;
  //     $localStorage.token = this.token;
  //     console.log(data);
  //     $state.go('home');
  //   },
  //   function err(err){
  //     console.log('Error:', err, 'error');
  //   });
  // }

  // this.logout = () => {
  //   this.token = null;
  //   $localStorage.token = null;
  // }
});