'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    ArticleMood = mongoose.model('ArticleMood'),
    _ = require('lodash');


//
//angular.module('sanitize', ['ngSanitize'])
//	.controller('ExampleController', ['$scope', function($scope) {
//	  $scope.myHTML =
//	     'I am an <code>HTML</code>string with ' +
//	     '<a href="#">links!</a> and other <em>stuff</em>';
//	}]);

module.exports = function(Articles) {

    return {
        
        /**
         * Report by Article, all moods
         */
    	aggregateMoodsByArticle : function(req, res) {
        	ArticleMood.aggregate([
		                			{	
		                				$group : {
		                					_id: { mood: "$mood", article: '$article' },
		                					total: { $sum: 1 }
		                				}
		                			}
		                		])
			.exec(function(err, articleMoods) {
				
		        if (err) {
		            return res.status(500).json({
		                error: 'Cannot list the article moods'
		                    });
		        }
		        
//		        var showAggregateMoods = function(aggregateMoods) {
//		        		//console.log('aggregateMoods entry ' + aggregateMoods);
//		        		//var aggregateMoodsStr = JSON.stringify(aggregateMoods);
//		        		var labelList = [];
//		        		var dataList = [];
//		        		//console.log('aggregateMoods stringify ' + aggregateMoodsStr);
//		        		for(var i=0, dataLen = aggregateMoods.length; i<dataLen; i++){
//		        			labelList.push(aggregateMoods[i]._id.mood);
//		        			dataList.push(aggregateMoods[i].total);
//		        		}   
//		        		
//		        		//console.log('labels: ' + labelList);
//		        		//console.log('data: ' + dataList);
//		        	
//		        };
//		        
//		        showAggregateMoods(articleMoods);
		        
		        res.json(articleMoods)
		    });
		}, 

		/**
         * Report by Month, all articles
         */
    	aggregateMoodsByMonth : function(req, res) {
        	ArticleMood.aggregate([
		                			
		                			{	
		                				$group : {
		                					_id: { mood: "$mood", 
		                						article: '$article',
		                						created: {
		                							month: { $month: "$created" },
		                							year: { $year: "$created"}
		                						}},
		                					total: { $sum: 1 }
		                				}
		                			}
		                		])
			.exec(function(err, articleMoods) {
				
		        if (err) {
		            return res.status(500).json({
		                error: 'Cannot list the article moods'
		                    });
		        }
		        
//		        var showAggregateMoods = function(aggregateMoods) {
//		        		//console.log('aggregateMoods entry ' + aggregateMoods);
//		        		//var aggregateMoodsStr = JSON.stringify(aggregateMoods);
//		        		var labelList = [];
//		        		var dataList = [];
//		        		//console.log('aggregateMoods stringify ' + aggregateMoodsStr);
//		        		for(var i=0, dataLen = aggregateMoods.length; i<dataLen; i++){
//		        			labelList.push(aggregateMoods[i]._id.mood);
//		        			dataList.push(aggregateMoods[i].total);
//		        		}   
//		        		
//		        		//console.log('labels: ' + labelList);
//		        		//console.log('data: ' + dataList);
//		        	
//		        };
//		        
//		        showAggregateMoods(articleMoods);
		        
		        res.json(articleMoods)
		    });
		}
    };
}