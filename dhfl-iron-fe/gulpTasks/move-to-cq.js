 "use strict";
var gulp 		= require( 'gulp' );
var fs 			= require( 'fs' );
var path 		= require( 'path' );
var combiner 	= require('stream-combiner2');
var through2	= require('through2');

var buildCompObj 	= require( path.resolve('./gulp-utilities/buildTemplatesObj.js' ) );
var templates 		= buildCompObj();


function moveToCq( cb ) {

	console.log( '-------------------------------------------' )
	console.log( '	Move To Project build step' );

	var templatesLength 	= templates.templateCount;
	var templatesCompiled 	= 0;

	for ( let templateKey in templates.templates ) {

		let template = templates.templates[ templateKey ];

		gulp.src( './' + template.path + '/build/**/*.*', {
				base: './' + template.path + '/build'
			} )
			.pipe( gulp.dest( template.config.clientLibPath ) )
			.pipe( through2.obj( function( chunk, enc, callback ){
				console.log( '		Moved: ' + template.name );
				console.log( '			To: ' + template.config.clientLibPath );
				templatesCompiled++;
			} ) );
	}

	var timeout = finished();


	function finished(  ){
		return setTimeout( function(){
			if( templatesCompiled == templatesLength ){
				console.log( '-------------------------------------------' );
				cb();
			} else {
				console.log('++', templatesCompiled, templatesLength);
				timeout = finished()
			}
		}, 500 )
	}

}

module.exports = moveToCq;
