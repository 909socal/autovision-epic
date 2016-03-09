var app = angular.module('app');

app.service('Item', function($http){  
  this.createItem = function(newItemObj) {
    return $http.post('/items', newItemObj);
  };

  this.getAllItems = function() {
    return $http.get('/items');
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
