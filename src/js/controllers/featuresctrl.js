'use strict'

var app = angular.module('app');

app.controller('featuresCtrl', function ($rootScope, $state, $localStorage) {
  console.log('features');
  $rootScope.user = $localStorage.token; 

  $(document).on("submit", "form", function(event) {
      console.log('in submit form');
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
            console.log('features are: ', res);
            $state.go('features');
          }
      });        
  });
});