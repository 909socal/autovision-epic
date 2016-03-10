var app = angular.module('app');

app.controller('profileCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Item, Autofeature, Auth) {
  // $rootScope.user = Auth.data; 
  $scope.isEditing = false; 
  $scope.editItem = {}; 

  $scope.autofeatureIsEditing = false; 
  $scope.autofeatureEditItem = {}; 

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
    $scope.category = $state.params.type;
    //console.log('Hi', $scope.items);
  });

  $scope.remove = function(item){
    var realIndex = $scope.items.indexOf(item); 
    $scope.items.splice(realIndex, 1);
    Item.remove(item._id.toString()); 
  }

  $scope.removeAutofeature = function(autofeature) {
    var realIndex = $scope.autofeatures.indexOf(autofeature); 
    $scope.autofeatures.splice(realIndex, 1);
    Autofeature.remove(autofeature._id.toString()); 
  }

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
      console.log('edit index: ', $scope.editIndex);

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

    $scope.editAutofeature = function(autofeature) {    
    if (autofeature && autofeature._id) {
      var autofeatureId = autofeature._id.toString();
    };
    if ($scope.autofeatureEditId === autofeatureId) {
      $scope.autofeatureIsEditing = false; 
      $scope.autofeatureEditId = '';       
      $scope.autofeatureEditItem = {};     
      $scope.autofeatureEditIndex = -1; 
    } else {
      console.log('in editing');
      $scope.autofeatureIsEditing = true; 
      $scope.autofeatureEditId = autofeatureId;
      $scope.autofeatureEditIndex = $scope.autofeatures.indexOf(autofeature); 
      console.log('auto feature edit index: ', $scope.autofeatureEditIndex);
      $scope.autofeatureEditItem = {
        _id: autofeature._id,
        make: autofeature.make,
        model: autofeature.model,
        year: autofeature.year,
        description: autofeature.description,
        category: autofeature.category
      };
      if (autofeature.contactinfo) {
        $scope.autofeatureEditItem.contactinfo = autofeature.contactinfo;
      };
      // $scope.editItem._id =autofeature._id; 
      // $scope.editItem.make =autofeature.make; 
      // $scope.editItem.model =autofeature.model; 
      // $scope.editItem.year =autofeature.year; 
      // $scope.editItem.description =autofeature.description; 
      // $scope.editItem.category =autofeature.category; 
      // if (autofeature.contactinfo) {
      //   $scope.editItem.contactinfo.email = autofeature.contactinfo.email;
      //   $scope.editItem.contactinfo.phone = autofeature.contactinfo.phone;
      //   $scope.editItem.contactinfo.zip = autofeature.contactinfo.zip;
      // };
    }
  }

  $scope.autofeatureEditConfirm = function(){

    console.log('auto feature edit confirm');
    
    // var realIndex = $scope.items.indexOf(item); 
    console.log('auto feature edit item in confirm',$scope.autofeatureEditItem);
    $scope.autofeatures[$scope.autofeatureEditIndex] = $scope.autofeatureEditItem; 
    Autofeature.edit($scope.autofeatureEditId, $scope.autofeatureEditItem);  
    
    $scope.autofeatureIsEditing = false; 
    $scope.autofeatureEditId = '';       
    $scope.autofeatureEditItem = {};
    $scope.autofeatureEditIndex = -1;  
  }    
});