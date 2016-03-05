app.controller('navCtrl', function($scope, Auth, $localStorage, $rootScope) {
  $rootScope.user = $localStorage.token; 
  // $rootScope.user = Auth.data; 
  // $scope.user = $rootScope.user;
  // $scope.user = Auth.user(); 
  // Auth.user(function(token){
  //   $scope.user = token; 
  // }); 
  // Auth.user().then(res => {
  //   this.data = res; 
  //   $localStorage.token = res;
  //   $scope.user = $localStorage.token; 
  // }); 
  // Auth.user().then((data)=>{
  //   console.log("HERE? \n \n");
  //     if (data) {
  //       this.token = data;
  //       $localStorage.token = this.token;
  //     };
  //   },
  //   function err(err) {
  //     console.log('err', err);
  //   });    ; 

  $scope.logout = function() { 
    Auth.logout();
    $rootScope.user = null; 
    // $scope.user = null; 
  }
});



