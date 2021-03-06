var app = angular.module('app');

app.service('Item', function($http){  
  this.createItem = function(newItemObj, token) {
    return $http.post(`/items/${token}`, newItemObj);
  };

  this.getAllItems = function() {
    return $http.get('/items');
  };

  this.getUserItems = function(token) {
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
