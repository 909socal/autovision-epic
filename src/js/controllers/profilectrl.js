var app = angular.module('app');

app.controller('profileCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, $location, $anchorScroll, Item, Autofeature, Auth) {
  $scope.isEditing = false; 
  $scope.editItem = {}; 

  $scope.autofeatureIsEditing = false; 
  $scope.autofeatureEditItem = {}; 

  if ($localStorage.token && $localStorage.token.config) {
    $rootScope.user = $localStorage.token;
  };

  if (!$rootScope.user) {
    $state.go('register');
  }

  Item.getUserItems($rootScope.user.data)
  .then(function(res){
    $scope.items = res.data; 
    $scope.category = $state.params.type;
  });

  Autofeature.getUserAutofeatures($rootScope.user.data)
  .then(function(res){
    $scope.autofeatures = res.data; 
    $scope.category = $state.params.type;
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

  $scope.edit = function(item, id){
    $location.hash(id);
    $anchorScroll();

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
        zip: item.zip,
        price: item.price,
        category: item.category
      };
      if (item.contactinfo) {
        $scope.editItem.contactinfo = item.contactinfo;
      };
    }
  }

  $scope.editConfirm = function(){
    $scope.items[$scope.editIndex] = $scope.editItem; 
    Item.edit($scope.editId, $scope.editItem);  
    $scope.isEditing = false; 
    $scope.editId = '';       
    $scope.editItem = {};
    $scope.editIndex = -1;   
  }

    $scope.editAutofeature = function(autofeature, id) { 
     $location.hash(id);
    $anchorScroll();   
    if (autofeature && autofeature._id) {
      var autofeatureId = autofeature._id.toString();
    };
    if ($scope.autofeatureEditId === autofeatureId) {
      $scope.autofeatureIsEditing = false; 
      $scope.autofeatureEditId = '';       
      $scope.autofeatureEditItem = {};     
      $scope.autofeatureEditIndex = -1; 
    } else {

      $scope.autofeatureIsEditing = true; 
      $scope.autofeatureEditId = autofeatureId;
      $scope.autofeatureEditIndex = $scope.autofeatures.indexOf(autofeature); 

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
    }
  }

  $scope.autofeatureEditConfirm = function() {
    $scope.autofeatures[$scope.autofeatureEditIndex] = $scope.autofeatureEditItem; 

    Autofeature.edit($scope.autofeatureEditId, $scope.autofeatureEditItem);  
    
    $scope.autofeatureIsEditing = false; 
    $scope.autofeatureEditId = '';       
    $scope.autofeatureEditItem = {};
    $scope.autofeatureEditIndex = -1;  
  }    
});