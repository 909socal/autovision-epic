var app = angular.module('app');

app.controller('profileCtrl', function($scope, $rootScope, $state, Item) {
  console.log('in profileCtrl', $state.params)

  Item.getAllItems()
  .then(function(res){
   $scope.items = res.data; 
   $scope.category = $state.params.type;
   console.log('Hi', $scope.items);
 });

  $scope.remove = function(item){
    var realIndex = $scope.items.indexOf(item); 
    $scope.items.splice(realIndex, 1);
    Item.remove(item._id.toString()); 
  }

  $scope.isEditing = false; 
  $scope.editItem = {}; 

  $scope.edit = function(item){
    console.log("scope edit");
    if (item && item._id) {
      var itemId = item._id.toString();
    };
    if ($scope.editId === itemId) {
      $scope.isEditing = false; 
      $scope.editId = '';       
      $scope.editItem = {};     
      $scope.editIndex = -1; 
    } else {
      $scope.isEditing = true; 
      $scope.editId = itemId;
      $scope.editIndex = $scope.items.indexOf(item); 
      $scope.editItem = {
        _id: item._id,
        make: item.make,
        model: item.model,
        year: item.year,
        description: item.description,
        category: item.category
      };
    }
  }

  $scope.editConfirm = function(){
    console.log("Edit confirm", $scope.editId, $scope.editItem);
    // var realIndex = $scope.items.indexOf(item); 
    $scope.items[$scope.editIndex] = $scope.editItem; 
    Item.edit($scope.editId, $scope.editItem);  
    $scope.isEditing = false; 
    $scope.editId = '';       
    $scope.editItem = {};
    $scope.editIndex = -1;   
  }
  
});