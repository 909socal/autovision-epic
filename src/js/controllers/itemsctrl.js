var app = angular.module('app');

app.controller('itemsCtrl', function($state , $scope, $rootScope, $localStorage, Item) {
  $rootScope.user = $localStorage.token; 

  // $scope.addItemClick = function() {
  //   Item.createItem($scope.item)
  //   .then(function(res){
  //     $state.go('forsale');
  //   });
  // };
  $scope.addItemClick = function() {
    Item.createItem($scope.item, $rootScope.user.data)
    .then(function(res){
      $state.go('forsale');
    });
  };

  $scope.getAllItemsClick = function() {
    Item.getAllItems()
    .then(function(res) {

    })
  };
  
  $(document).on("submit", "form", function(event)
  {
      event.preventDefault();
      var url=$(this).attr("action");
      $.ajax({
          url: url,
          type: $(this).attr("method"),
          dataType: "JSON",
          data: new FormData(this),
          processData: false,
          contentType: false,
          complete: function() {
            $state.go('home');
          }
      });        
  });

});