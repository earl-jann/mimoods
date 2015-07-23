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
         * Find article by id
         */
        article: function(req, res, next, id) {
            Article.load(id, function(err, article) {
                if (err) return next(err);
                if (!article) return next(new Error('Failed to load article ' + id));
                req.article = article;
                next();
            });
        },
        /**
         * Create an article
         */
        create: function(req, res) {
            var article = new Article(req.body);
            article.user = req.user;

            article.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the article'
                    });
                }

                Articles.events.publish('create', {
                    description: req.user.name + ' created ' + req.body.title + ' article.'
                });

                res.json(article);
            });
        },
        /**
         * Update an article
         */
        update: function(req, res) {
            var article = req.article;

            article = _.extend(article, req.body);


            article.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the article'
                    });
                }

                Articles.events.publish('update', {
                    description: req.user.name + ' updated ' + req.body.title + ' article.'
                });

                res.json(article);
            });
        },
        /**
         * Delete an article
         */
        destroy: function(req, res) {
            var article = req.article;


            article.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the article'
                    });
                }

                Articles.events.publish('remove', {
                    description: req.user.name + ' deleted ' + article.title + ' article.'
                });

                res.json(article);
            });
        },
        /**
         * Show an article
         */
        show: function(req, res) {
        	
        	if ((req.user) && (req.article))
        		Articles.events.publish('view', {
            		description: req.user.name + ' read ' + req.article.title + ' article.'
        		});

            res.json(req.article);
        },
        /**
         * List of Articles
         */
        all: function(req, res) {
            var query = req.acl.query('Article');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, articles) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the articles'
                    });
                }

                res.json(articles)
            });

        },
        /**
         * List of Article Moods
         */
        moodsForArticle : function(req, res) {
		    ArticleMood.find({ 'article' : new mongoose.Types.ObjectId(req.params.articleId)})
		    .populate('article', 'title')
			.sort('-created')
			.exec(function(err, articleMoods) {
		        if (err) {
		            return res.status(500).json({
		                error: 'Cannot list the article moods'
		                    });
		        }
		        
		        res.json(articleMoods)
		    });
		},
        /**
         * List of Article Moods
         */
        aggregateMoodsForArticle : function(req, res) {
        	ArticleMood.aggregate([
		                			{ $match: { 'article' : new mongoose.Types.ObjectId(req.params.articleId) } },
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
		}
    };
}