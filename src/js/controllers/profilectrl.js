var app = angular.module('app');

app.controller('profileCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Item, Autofeature, Auth) {
  // $rootScope.user = Auth.data; 
  if ($localStorage.token && $localStorage.token.config) {
    $rootScope.user = $localStorage.token;
  };

  Item.getUserItems($rootScope.user.data)
  .then(function(res){
    $scope.items = res.data; 
    $scope.category = $state.params.type;
    // console.log('Hi', $scope.items);
  });

  Autofeature.getUserAutofeatures($rootScope.user.data)
  .then(function(res){
    $scope.autofeatures = res.data; 
    console.log('autofeatures are: ', res.data);
    //$scope.category = $state.params.type;
    //console.log('Hi', $scope.items);
  });

  $scope.remove = function(item){
    var realIndex = $scope.items.indexOf(item); 
    $scope.items.splice(realIndex, 1);
    Item.remove(item._id.toString()); 
  }

  $scope.isEditing = false; 
  $scope.editItem = {}; 

  $scope.edit = function(item){
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
      if (item.contactinfo) {
        $scope.editItem.contactinfo = item.contactinfo;
      };
      // $scope.editItem._id =item._id; 
      // $scope.editItem.make =item.make; 
      // $scope.editItem.model =item.model; 
      // $scope.editItem.year =item.year; 
      // $scope.editItem.description =item.description; 
      // $scope.editItem.category =item.category; 
      // if (item.contactinfo) {
      //   $scope.editItem.contactinfo.email = item.contactinfo.email;
      //   $scope.editItem.contactinfo.phone = item.contactinfo.phone;
      //   $scope.editItem.contactinfo.zip = item.contactinfo.zip;
      // };
    }
  }

  $scope.editConfirm = function(){
    // var realIndex = $scope.items.indexOf(item); 
    $scope.items[$scope.editIndex] = $scope.editItem; 
    Item.edit($scope.editId, $scope.editItem);  
    $scope.isEditing = false; 
    $scope.editId = '';       
    $scope.editItem = {};
    $scope.editIndex = -1;   
  }  
});