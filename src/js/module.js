'use strict';

var app = angular.module('app', ['ui.router', 'ngStorage']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', { url: '/', templateUrl: 'html/home.html'})
  .state('forsale', { url: '/forsale', templateUrl: 'html/forsale.html'})
  .state('forsaleitem', { url: '/forsaleitem', templateUrl: 'html/forsaleitem.html'})
  .state('forsaleitemdetail', { url: '/forsaleitemdetail', templateUrl: 'html/forsaleitemdetail.html'})
  .state('profile', { url: '/profile', templateUrl: 'html/profile.html'})
  .state('register', { url: '/register', templateUrl: 'html/register.html', controller: 'loginregisterCtrl'})
  .state('additem', { url: '/additem', templateUrl: 'html/additem.html', controller: 'addItemCtrl'})
  .state('login', { url: '/login', templateUrl: 'html/login.html', controller: 'loginregisterCtrl'})
  .state('showroom', { url: '/showroom', templateUrl: 'html/showroom.html'})
  .state('features', { url: '/features', templateUrl: 'html/features.html'})
  .state('featuresadd', { url: '/featuresadd', templateUrl: 'html/featuresadd.html'})
  $urlRouterProvider.otherwise('/');
});