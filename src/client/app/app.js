'use strict';

angular.module('flideApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ng','perfect_scrollbar'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');

    $urlRouterProvider.otherwise('/edit/articles/0');
    $stateProvider
      .state('welcome', {
        url: '/welcome',
        template: '<h1>Welcome Page</h1>',
      })
      .state('signin', {
        url: '/signin',
        template: '<h1>Sign In Page</h1>',
      })
      .state('register', {
        url: '/register',
        template: '<h1>Registration Page</h1>',
      })
      .state('edit', {
          url: '/edit/articles/{articleId}',
          templateUrl: 'app/edit/edit.html',
          controller: 'editCtrl',
          controllerAs: 'editCtrl'
      })
      .state('edit.content', {
        url: '/slides/{slideId}/sub-slides/{subslideId}/content',
        templateUrl: 'app/edit/content/content.html',
        controller: 'contentCtrl',
        controllerAs: 'contentCtrl'
      })
      .state('edit.theme', {
        url: '/slides/{slideId}/sub-slides/{subslideId}/theme',
        templateUrl: 'app/edit/theme/theme.html',
        controller: 'themeCtrl',
        controllerAs: 'themeCtrl'
      })
      .state('edit.style', {
        url: '/slides/{slideId}/sub-slides/{subslideId}/style',
        templateUrl: 'app/edit/style/style.html',
        controller: 'styleCtrl',
        controllerAs: 'styleCtrl'
      });
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, authSvc) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      authSvc.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });