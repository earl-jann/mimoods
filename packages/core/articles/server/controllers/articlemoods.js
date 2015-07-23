var mongoose = require('mongoose'),
    Article = mongoose.model("Article"),
	User = mongoose.model("User"),
	ArticleMood = mongoose.model("ArticleMood"),
    ObjectId = mongoose.Types.ObjectId
	
module.exports = function(ArticleMoods) {
	return {
		
		create : function(req, res, next) {
		    var articleMoodModel = new ArticleMood(req.body);
		    articleMoodModel.save(function(err, articleMood) {
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Error occured: " + err
		            })
		        } else {
		            res.json({
		                type: true,
		                data: articleMood
		            })
		        }
		    })
		},
		
		show : function(req, res, next) {
		    ArticleMood.findById(new ObjectId(req.params.moodId), function(err, articleMood) {
				console.log('findById: ' + req.params.id + req.params.moodId + err + articleMood);
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Error occured: " + err
		            })
		        } else {
		            if (articleMood) {
		                res.json({
		                    type: true,
		                    data: articleMood
		                })
		            } else {
		                res.json({
		                    type: false,
		                    data: "ArticleMood: " + req.params.moodId + " not found"
		                })
		            }
		        }
		    })
		},
		
		update : function(req, res, next) {
		    var updatedArticleMoodModel = new ArticleMood(req.body);
		    ArticleMood.findByIdAndUpdate(new ObjectId(req.params.id), updatedArticleMoodModel, function(err, articleMood) {
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Error occured: " + err
		            })
		        } else {
		            if (articleMood) {
		                res.json({
		                    type: true,
		                    data: articleMood
		                })
		            } else {
		                res.json({
		                    type: false,
		                    data: "ArticleMood: " + req.params.id + " not found"
		                })
		            }
		        }
		    })
		},
		
		destroy : function(req, res, next) {
		    ArticleMood.findByIdAndRemove(new Object(req.params.id), function(err, articleMood) {
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Error occured: " + err
		            })
		        } else {
		            res.json({
		                type: true,
		                data: "ArticleMood: " + req.params.id + " deleted successfully"
		            })
		        }
		    })
		},
		
		all = function(req, res, next) {
		    ArticleMood.find({})
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
		
		moodsForArticle = function(req, res, next) {
		    ArticleMood.find({article : new ObjectId(req.params.articleId)})
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
		}
	};
}
		

		




