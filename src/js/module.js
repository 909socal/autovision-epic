'use strict';

var app = angular.module('app', ['ui.router', 'ngStorage']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', { url: '/', templateUrl: 'html/home.html', controller:'forsaleitemCtrl'})
  .state('forsale', { url: '/forsale', templateUrl: 'html/forsale.html', controller:'forsaleCtrl'})
  .state('forsaleitem', { url: '/forsaleitem/:type', templateUrl: 'html/forsaleitem.html', controller:'forsaleitemCtrl'})
  .state('forsaleitemdetail', { url: '/forsaleitemdetail', templateUrl: 'html/forsaleitemdetail.html'})
  .state('profile', { url: '/profile', templateUrl: 'html/profile.html', controller: 'profileCtrl'})
  .state('register', { url: '/register', templateUrl: 'html/register.html', controller: 'loginregisterCtrl'})
  .state('additem', { url: '/additem', templateUrl: 'html/additem.html', controller: 'itemsCtrl'})
  .state('login', { url: '/login', templateUrl: 'html/login.html', controller: 'loginregisterCtrl'})
  .state('showroom', { url: '/showroom', templateUrl: 'html/showroom.html'})
  .state('features', { url: '/features', templateUrl: 'html/features.html'})
  .state('featuresadd', { url: '/featuresadd', templateUrl: 'html/featuresadd.html'})
  $urlRouterProvider.otherwise('/');
});