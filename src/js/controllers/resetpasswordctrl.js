app.controller('resetPasswordCtrl', function($scope, $state, Auth, $localStorage, $rootScope) {

  $scope.forgotPassword = function() {   
    Auth.forgotPassword($scope.forgotPasswordEmail)
     .then(function(res) {
        swal(`Password reset email sent to ${res.config.data.email}`);
        $state.go('login');
     }); 
  };
});