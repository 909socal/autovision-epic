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

  this.resetPassword = (user, newPassword) => {
    var resetUser = {
      user:user,
      newPassword:newPassword
    }
    return $http({method: 'PUT', url: '/users/reset', data: resetUser});
  }

  this.forgotPassword = (email) => {
    console.log('in forgot passwords', email);
    var userEmail = {
      email:email
    }
    return $http({method: 'POST', url: '/users/forgotpassword', data: userEmail});
  }

  this.user = function() {
    this.data = $localStorage.token; 
    $rootScope.user = $localStorage.token; 
  }

});