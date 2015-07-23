'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Reports, app, auth, database) {

  var reports = require('../controllers/reports')(Reports);
  
  app.route('/api/reports/aggregateMoodsByMonth')
  .get(reports.aggregateMoodsByMonth);
//  .get(auth.isMongoId, auth.requiresAdmin, reports.aggregateMoodsByMonth);

  app.route('/api/reports/aggregateMoodsByArticle')
  .get(reports.aggregateMoodsByArticle);
//  .get(auth.isMongoId, auth.requiresAdmin, reports.aggregateMoodsByArticle);

};
