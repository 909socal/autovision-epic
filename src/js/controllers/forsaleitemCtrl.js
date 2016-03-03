var app = angular.module('app');

app.controller('forsaleitemCtrl', function($scope, $rootScope, $state, Item) {
  console.log('in forsaleitemsCtrl', $state.params)

 Item.getAllItems()
      .then(function(res){
        $scope.items = res.data; 
        $scope.category=$state.params.type;
        console.log('Hi', $scope.items);
      });

  
});