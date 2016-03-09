var app = angular.module('app');

app.controller('itemsCtrl', function($state , $scope, $rootScope, $localStorage, Item) {
  $rootScope.user = $localStorage.token; 

  // $scope.addItemClick = function() {
  //   Item.createItem($scope.item, $rootScope.user.data)
  //   .then(function(res){
  //     $state.go('forsale');
  //   });
  // };

  $scope.getAllItemsClick = function() {
    Item.getAllItems()
    .then(function(res) {

    })
  };
  
  $(document).on("submit", "form", function(event) {
      event.preventDefault();
      var url = 'items/' + $rootScope.user.data;
      $.ajax({
          url: url,
          type: 'POST',
          dataType: "JSON",
          data: new FormData(this),
          processData: false,
          contentType: false,
          complete: function(res) {
            Item.image = res.responseJSON.image.data[0].data;
            /*$scope.image = res.responseJSON.image.data[0];
            console.log("data is: ", $scope.image);
            Item.image = $scope.image;*/
            $state.go('profile');
          }
      });        
  });
});