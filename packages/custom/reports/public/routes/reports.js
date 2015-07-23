'use strict';

angular.module('mean.reports').config(['$stateProvider',

  function($stateProvider) {
    // Check if user has role
    var checkUserRole = function(role, $q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in and get user data including roles
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0' && (user.roles.indexOf(role) > -1 || user.roles.indexOf('admin') > -1)) $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/auth/login');
        }
      });

      return deferred.promise;
    };

    $stateProvider.state('reports', {
      url: '/reports',
      templateUrl: 'reports/views/index.html'
    })
    .state('monthly reports', {
      url: '/reports/monthly',
      templateUrl: 'report/views/monthly.html',
        resolve: {
          loggedin: function($q, $timeout, $http, $location) {
                return checkUserRole('contributor', $q, $timeout, $http, $location)
            }
        }
    })
    .state('yearly reports', {
      url: '/reports/yearly',
      templateUrl: 'report/views/yearly.html',
        resolve: {
          loggedin: function($q, $timeout, $http, $location) {
                return checkUserRole('contributor', $q, $timeout, $http, $location)
            }
        }
    });
  }
]);
