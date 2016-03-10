var app = angular.module('app');

app.service('Autofeature', function($http) {  
  this.createItem = function(newAutofeature, token) {
    return $http.post(`/autofeatures/${token}`, newAutofeature);
  };

  this.getAllItems = function() {
    return $http.get('/autofeatures');
  };

  this.getUserAutofeatures = function(token) {
    return $http.get(`/autofeatures/${token}`);
  };

  this.remove = function(autofeatureId) {
    return $http.delete(`/autofeatures/${autofeatureId}`)
  };

  this.edit = function(autofeatureId, editItem) {
    return $http.put(`/autofeatures/${autofeatureId}`, editAutofeature)
  };

  this.getItem = function(autofeatureId) {
    return $http.get(`/autofeatures/single/${autofeatureId}`);
  }
});
