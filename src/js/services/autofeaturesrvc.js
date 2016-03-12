var app = angular.module('app');

app.service('Autofeature', function($http) {  
  this.createAutofeature = function(newAutofeature, token) {
    return $http.post(`/features/${token}`, newAutofeature);
  };

  this.getAllAutofeatures = function() {
    return $http.get('/features');
  };

  this.getUserAutofeatures = function(token) {
    console.log('getUserAutofeatures');
    return $http.get(`/features/${token}`);
  };

  this.remove = function(autofeatureId) {
    return $http.delete(`/features/${autofeatureId}`)
  };

  this.edit = function(autofeatureId, editAutofeature) {
    return $http.put(`/features/${autofeatureId}`, editAutofeature)
  };

  this.getAutofeatures = function(autofeatureId) {
    return $http.get(`/features/single/${autofeatureId}`);
  }
});
