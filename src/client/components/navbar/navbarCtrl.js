'use strict';

angular.module('flideApp')
  .controller('navbarCtrl', function ($scope, $location, authSvc) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = authSvc.isLoggedIn;
    $scope.isAdmin = authSvc.isAdmin;
    $scope.getCurrentUser = authSvc.getCurrentUser;

    $scope.logout = function() {
      authSvc.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });