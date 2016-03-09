var app = angular.module('app');

app.service('Item', function($http){
  // this.createItem = function(newItemObj) {
  //   console.log('createItem() in items Srvc.js');
  //   console.log('new item is: ', newItemObj);
  //   return $http.post('/items', newItemObj);
  // };

  this.image;
  
  this.createItem = function(newItemObj, token) {
    console.log('createItem() in items Srvc.js');
    console.log('new item is: ', newItemObj);
    return $http.post(`/items/${token}`, newItemObj);
  };

  this.getAllItems = function() {
    return $http.get('/items');
  };

  this.getUserItems = function(token) {
    console.log('get user items');
    return $http.get(`/items/${token}`);
  };

  this.remove = function(itemId) {
    return $http.delete(`/items/${itemId}`)
  };

  this.edit = function(itemId, editItem) {
    return $http.put(`/items/${itemId}`, editItem)
  };

  this.getItem = function(itemId) {
    return $http.get(`/items/single/${itemId}`);
  }
});
