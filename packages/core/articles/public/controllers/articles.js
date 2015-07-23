'use strict';


angular.module('mean.articles' , ["chart.js"]).controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', 'ArticleMoods', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Articles, ArticleMoods, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return MeanUser.isAdmin || article.user._id === MeanUser.user._id;
    };

    $scope.availableCircles = [];

    Circles.mine(function(acl) {
        $scope.availableCircles = acl.allowed;
        $scope.allDescendants = acl.descendants;
    });

    $scope.showDescendants = function(permission) {
        var temp = $('.ui-select-container .btn-primary').text().split(' ');
        temp.shift(); //remove close icon
        var selected = temp.join(' ');
        $scope.descendants = $scope.allDescendants[selected];
    };

    $scope.selectPermission = function() {
        $scope.descendants = [];
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.article.permissions.push('test test');
        var article = new Articles($scope.article);

        article.$save(function(response) {
          $location.path('articles/' + response._id);
        });

        $scope.article = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove(function(response) {
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
              $scope.articles.splice(i, 1);
            }
          }
          $location.path('articles');
        });
      } else {
        $scope.article.$remove(function(response) {
          $location.path('articles');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var article = $scope.article;
        if (!article.updated) {
          article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
          $location.path('articles/' + article._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Articles.query(function(articles) {
        $scope.articles = articles;
      });
    };

    $scope.findOne = function() {
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
    	  console.log('initialize findOne');
        $scope.article = article;
      });
    };
    
    // EDIT THIS PART
//    $scope.findMoodsByMonth = function() {
//    	 Articles.query(function(articles) {
//    	        $scope.articles = articles;
//    	 });
//      };
    
//	"_id": {
//  "mood": "NEUTRAL",
//  "article": "55b0b4ffb2560c2f36a249ed"
// },
//"total": 1
    
//    Array.prototype.mapProperty = function(property) {
//       	return this.map(function (obj) {
//       		return obj[property];
//       	});
//      };
//      
//      
//    $scope.showAggregateMoods = function() {
//    	ArticleMoods.get({
//    		articleId: $stateParams.articleId
//    	}, function(aggregateMoods) {
//    		console.log('aggregateMoods entry');
//    		$scope.labels = aggregateMoods.mapProperty('_id');
//    		$scope.data = aggregateMoods.mapProperty('total');
//    		console.log($scope.labels);
//    		console.log($scope.data);
//    	});
//    };
    
    $scope.initialize = function() {
    	console.log('initialize start');
    	findOne();
//    	showAggregateMoods();
    	console.log('initialize end');
    };

      // PIE CHART
//      $scope.labels = ["HAPPY", "SAD", "INSPIRED","ANGRY","ANNOYED","NEUTRAL","AFRAID"];
//      $scope.data = [300, 500, 100, 55, 932, 213, 23];
    	
    
      // LINE CHART
//	  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"]; //
//	  $scope.series = ['Series A', 'Series B']; // MOODS
//	  $scope.data = [
//	    [65, 59, 80, 81, 56, 55, 40],
//	    [28, 48, 40, 19, 86, 27, 90]
//	  ];
//	  $scope.onClick = function (points, evt) {
//	    console.log(points, evt);
//	  };
  }
]);