'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Reports, app, auth, database) {

  app.get('/api/reports/moods_by_article', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/reports/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/reports/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/reports/example/render', function(req, res, next) {
    Reports.render('index', {
      package: 'reports'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
