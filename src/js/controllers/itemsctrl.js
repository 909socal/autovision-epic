var app = angular.module('app');

app.controller('itemsCtrl', function($state , $scope, $rootScope, $localStorage, Item) {
  $rootScope.user = $localStorage.token;

  $("form").submit(function(event) {
    event.preventDefault();
    var newitem = new FormData(this);
    var url = 'items/' + $rootScope.user.data;
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