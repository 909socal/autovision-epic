app.controller('resetPasswordCtrl', function($scope, $state, Auth, $localStorage, $rootScope) {

  $scope.forgotPassword = function() {   
    Auth.forgotPassword($scope.forgotPasswordEmail)
     .then(function(res) {
      console.log('res');

     }); 
  };
});