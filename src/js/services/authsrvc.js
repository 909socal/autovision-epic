app.service('Auth', function($http, $state, $localStorage, $rootScope) {
  this.register = function(user) {    
    $http({method: 'POST', url: '/users/register', data: user}).then(function success(data){
      $state.go('login');
    }, function err(err){
    });    
  };

  this.login = (user) => {
    return $http({method: 'POST', url: '/users/login', data: user});
    // $http({method: 'POST', url: '/users/login', data: user});
    // .then((data)=>{
    //   this.token = data;
    //   $localStorage.token = this.token;
    //   $state.go('profile');
    //   // return data;
    //   return true;
    // },
    // function err(err) {
    //   console.log('inside err', err);
    // });    
  }
  
  this.logout = () => {
    this.token = null;
    $localStorage.token = null;
    $state.go('home');
  }

  // this.user = () => {
  //   // return $localStorage.token; 
  //   // return $http({method: 'GET', url: '/users'})
  //   // .then((data)=>{
  //   //   if (data) {
  //   //     this.token = data;
  //   //     $localStorage.token = this.token;
  //   //   };
  //   // },
  //   // function err(err) {
  //   //   console.log('err', err);
  //   // });    
  //   // return $http.get('/users');
  //   // .then(res => {
  //   //   this.data = res; 
  //   //   $localStorage.token = res;
  //   // });  

  //   console.log("token HERE??? \n", $localStorage.token);
  //   return $localStorage.token; 
  // }

  // this.user = function(cb){
  //   cb($localStorage.token); 
  // }

  this.user = function() {
    // return $http.get('/users').then(res => {
    //   this.data = res.data; 
    // });  
    this.data = $localStorage.token; 
    console.log($localStorage.token, "LOCALSTORAGE TOKEN \n");
    $rootScope.user = $localStorage.token; 
  }

});