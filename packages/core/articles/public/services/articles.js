'use strict';

var meanArticlesModule = angular.module('mean.articles');

//Articles service used for articles REST endpoint
meanArticlesModule.factory('Articles', ['$resource',
  function($resource) {
    return $resource('api/articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


meanArticlesModule.factory('ArticleMoods', ['$resource',
  function($resource) {
    return $resource('api/articles/:articleId/aggregateMoods', {
      articleId: '@_id'
    });
  }
]);