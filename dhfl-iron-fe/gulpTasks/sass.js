 "use strict";
var gulp 			= require( 'gulp' );
var sass 			= require( 'gulp-sass' );
var combiner		= require( 'stream-combiner2' );
var through2		= require( 'through2' );
var postcss			= require( 'gulp-rename' );
var autoprefixer	= require( 'gulp-autoprefixer' );
var minifyCss 		= require( 'gulp-minify-css' );
var gulpif 			= require( 'gulp-if' );
var argv 			= require( 'yargs' ).argv;



var buildCompObj 	= require( './../gulp-utilities/buildTemplatesObj' );
var templates 		= buildCompObj();

module.exports = function ( cb ) {

	let minify = argv.env === 'production' ? true : false ;

	console.log( '-------------------------------------------' )

	if( minify ){
		console.log( '	Sass & Minify build step' );
	} else {
		console.log( '	Sass build step' );
	}

	var templatesLength 	= templates.templateCount;
	var templatesCompiled 	= 0;

	for ( let templateKey in templates.templates ) {

		let template = templates.templates[ templateKey ];


		gulp.src( './' + template.path + '/styles/'+ template.name +'.scss' )
			//.pipe( sass() )
			.pipe( sass(
				{
					style: 'compressed',
					sourceComments: false,
					errLogToConsole: false,
					onError: function(err) {
			            console.error( err );
						cb( 'Sass ERROR!!' );
						return {}
			        }
				}
			))
			.pipe( autoprefixer({
				browsers: ['last 4 versions'],
				cascade: true
			}) )
			.pipe( gulpif( minify, minifyCss() ) )
			.pipe( postcss( 'bundled.' + template.name  + '.css') )
			.pipe( gulp.dest( './' + template.path + '/build/css' ) )
			.pipe( through2.obj( function( chunk, enc, callback ){
				console.log( '		bundled: ' + template.name );
				templatesCompiled++;
			} ) );
	};

	var timeout = finished();
	var waited	= 4;

	function finished(  ){
		return setTimeout( function(){
			if( templatesCompiled == templatesLength ){
				console.log( '-------------------------------------------' );
				cb();
			} else {
				if( waited == 0 ){
					cb();
				} else {
					//console.log('compiling sass');
					waited--;
					timeout = finished();
				}

			}
		}, 500 )
	}



}
