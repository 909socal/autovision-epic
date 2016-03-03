var app = angular.module('app');

app.controller('profileCtrl', function($scope, $rootScope, $state, Item) {
  console.log('in profileCtrl', $state.params)

 Item.getAllItems()
      .then(function(res){
        $scope.items = res.data; 
        $scope.category=$state.params.type;
        console.log('Hi', $scope.items);
      });

  $scope.remove = function(item){
    var realIndex = $scope.items.indexOf(item); 
    $scope.items.splice(realIndex, 1);
    Item.remove(item._id.toString()); 
  }
  
});