app.service('Auth', function($http, $state, $localStorage) {
  this.register = function(user) {    
    $http({method: 'POST', url: '/users/register', data: user}).then(function success(data){
      $state.go('login');
    }, function err(err){
    });    
  };

  this.login = function(user) {
    return $http({method: 'POST', url: '/users/login', data: user}).then((data)=>{
      this.token = data;
      $localStorage.token = this.token;
      $state.go('profile');
      window.location.reload();
    },
    function err(err) {
    });    
  }
  
  this.logout = () => {
    this.token = null;
    $localStorage.token = null;
    $state.go('home');
    window.location.reload();
  }

  this.user = () => {
    // return $localStorage.token; 
    return $http({method: 'GET', url: '/users'}).then((data)=>{
      this.token = data;
      $localStorage.token = this.token;
      $state.go('profile');
      window.location.reload();
    },
    function err(err) {
    });    
  }

});