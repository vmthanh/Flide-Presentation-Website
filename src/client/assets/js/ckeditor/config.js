/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.extraPlugins = "custom";
	config.toolbar = 'MyToolbar';
	config.toolbar_MyToolbar = 
		[  
			['head1','head2','head3','FontSize','TextColor','delete','moreOptions'],       
      	];
	config.allowedContent = true;
    config.removePlugins = 'liststyle,tabletools,contextmenu';
    config.title = false;
};
