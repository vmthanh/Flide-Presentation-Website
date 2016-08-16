'use strict';

module.exports = function(app){
	var config = require('../../../config/environment');
	var express = require('express');
	var multer  = require('multer');
	var done = false;
	app.use(multer({ dest: config.fileUploadFolder,
		 rename: function (fieldname, filename) {
		    return filename + Date.now();
		  },
		onFileUploadStart: function (file) {
		  console.log(file.originalname + ' is starting ...')
		},
		onFileUploadComplete: function (file) {
		  console.log(file.fieldname + ' uploaded to  ' + file.path)
		  done=true;
		}
	}));

	var router = express.Router();
	router.post('/api/photo',function(req,res){
	  if(done===true){
	    console.log("ABC");
	    res.end("uploaded");
	  }
	});
}