/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var domain = require('domain');

/*reusable components between client and server.
should be moved to share folder that can be access from both client and server:
- jsextension
- promise
....
*/
require('../client/assets/js/jsextension');
var errors = require('./components/errors');

var d = domain.create();
d.on('error', function(err) {
    console.log(err);

});


d.run(function() {
    // Connect to database
    mongoose.connect(config.mongo.uri, config.mongo.options);

    // Populate DB with sample data
    /*if(config.seedDB) { require('./config/seed'); }*/

    // Setup server
    var app = express();
    var server = require('http').createServer(app);
    require('./config/express')(app);
    require('./routes')(app);

    // Start server
    server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });

    // Expose app
    exports = module.exports = app;
});
