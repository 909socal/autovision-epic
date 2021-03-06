'use strict'

var app = angular.module('app');

app.controller('featuresCtrl', function ($rootScope, $state, $localStorage) {
  $rootScope.user = $localStorage.token; 

  if (!$rootScope.user) {
    $state.go('register');
  }

  $("form").submit(function(event) {
      event.preventDefault();
      var url = 'features/' + $rootScope.user.data;
      $.ajax({
          url: url,
          type: 'POST',
          dataType: "JSON",
          data: new FormData(this),
          processData: false,
          contentType: false,
          complete: function(res) {
            $state.go('profile');
          }
      });        
  });
});