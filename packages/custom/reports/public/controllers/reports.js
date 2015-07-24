'use strict';

/* jshint -W098 */
angular.module('mean.reports', ['chart.js']).controller('ReportsController', ['$scope', 'Global', 'Reports',
  function($scope, Global, Reports) {
    $scope.global = Global;
    $scope.package = {
      name: 'reports'
    };

    
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ["Happy", "Neutral", "Angry", "Inspired", "Sad", "Annoyed", "Afraid"];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90],
      [18, 48, 60, 49, 56, 37, 70],
      [28, 68, 64, 49, 26, 27, 20],
      [18, 78, 65, 49, 26, 47, 60],
      [23, 66, 69, 29, 16, 47, 10],
      [20, 56, 29, 19, 66, 37, 20]
    ];


    
    
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };
  }
]);
