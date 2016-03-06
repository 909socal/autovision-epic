var app = angular.module('app');

app.controller('forsaleitemCtrl', function($scope, $rootScope, $state, Item, Auth, $localStorage) {
  // console.log('in forsaleitemsCtrl', $state.params)
  $rootScope.user = $localStorage.token; 

 Item.getAllItems()
      .then(function(res){
        $scope.items = res.data; 
        $scope.category=$state.params.type;
        // console.log('Hi', $scope.items);
      });

  
});