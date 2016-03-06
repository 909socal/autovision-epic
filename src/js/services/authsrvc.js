app.service('Auth', function($http, $state, $localStorage, $rootScope) {
  this.register = function(user) {    
    $http({method: 'POST', url: '/users/register', data: user}).then(function success(data){
      $state.go('login');
    }, function err(err){
    });    
  };

  this.login = (user) => {
    return $http({method: 'POST', url: '/users/login', data: user});
  }
  
  this.logout = () => {
    this.token = null;
    $localStorage.token = null;
    $state.go('home');
  }


  this.user = function() {
    this.data = $localStorage.token; 
    console.log($localStorage.token, "LOCALSTORAGE TOKEN \n");
    $rootScope.user = $localStorage.token; 
  }

});