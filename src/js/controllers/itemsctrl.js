var app = angular.module('app');

app.controller('itemsCtrl', function($scope, Item) {
  console.log('items CTRL');

  $scope.addItemClick = function() {
    console.log('item click');
    console.log('item object: ', $scope.item);

  //   Item.createItem($scope.item)
  //   .then(function(res){
  //    console.log('get all items res', res);
  // });




  };
  
  /*
  var item = {
    make: "Toyota", 
    model: "Camry", 
    description: "Dope"
  }
  Item.createItem(item)
  .then(function(res){
    console.log('get all items res', res);
    // //$scope.itemObject = res.data; 
    // console.log('get all items res.data', res.data);
    // $scope.itemObjectsArray = res.data; 

  });

  Item.getAllItems()
  .then(function(res){
    console.log(res, 'Hi');
  })
  */

}); 