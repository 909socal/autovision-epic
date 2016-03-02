var app = angular.module('app');

app.service('Item', function($http){
  this.createItem = function(newItemObj) {
    console.log('createItem() in items Srvc.js');
    console.log('new item is: ', newItemObj);
    return $http.post('/items', newItemObj);
  };

  this.getAllItems = function() {
    console.log('geta;;items');
    return $http.get('/items');
  };
});
