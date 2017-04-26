 "use strict";
var gulp 			= require( 'gulp' );
var browserify 		= require( 'browserify' );
var source 			= require( 'vinyl-source-stream' );
var fs 				= require( 'fs' );
var babelify 		= require( 'babelify' );
var reactify 		= require( 'reactify' );
var combiner 		= require( 'stream-combiner2' );
var through2		= require( 'through2' );
var path			= require( 'path' );
var util			= require( 'util' );
var rename          = require( 'gulp-rename' );
var es              = require( 'event-stream' );
var prettyHrtime 	= require( 'pretty-hrtime' );
var buffer 			= require( 'vinyl-buffer' );
var uglify 			= require( 'gulp-uglify' );
var gulpif 			= require( 'gulp-if' );
var argv 			= require( 'yargs' ).argv;




var config 				= require( './../config.json' );
var buildTemplatesObj 	= require( './../gulp-utilities/buildTemplatesObj' );




function browserifyTask( cb ) {

	let librariesToCompile 	= buildTemplatesObj();
	let templates 			= [];
	let minify 				= argv.env === 'production' ? true : false ;
	let templateToBundle	= argv.template;

	// if user has defined a template to bundle
	// only bundle that template
	if( !templateToBundle ){
		for ( var key in librariesToCompile.templates ) {
			if ( librariesToCompile.templates.hasOwnProperty(key) ) {
				let template = librariesToCompile.templates[key];
				templates.push( {
					entry : path.resolve( './' + template.path + "/" + template.main ),
					path : template.path,
					name : template.name
				});
			}
		}
	} else {

		if ( librariesToCompile.templates.hasOwnProperty(templateToBundle) ) {
			let template = librariesToCompile.templates[templateToBundle];
			templates.push( {
				entry : path.resolve( './' + template.path + "/" + template.main ),
				path : template.path,
				name : template.name
			});
		}

	}

	console.log( '-------------------------------------------' )

	if( minify ){
		console.log( '	Browserify & Minify build step' );
	} else {
		console.log( '	Browserify build step' );
	}



	function runBrowserify() {
		let lib = templates.pop();

		var start = process.hrtime();

		browserify({
				entries: [ lib.entry ],
				transform: [ babelify, reactify ]
			})
            .bundle()
            .pipe(source(lib.name))
			.pipe( buffer() )
			.pipe( gulpif( minify , uglify() ) )
            // rename them to have "bundle as postfix"
            .pipe(rename({
                prefix: 'bundled.',
                extname: '.js'
            }))
            .pipe(gulp.dest( lib.path + "/build/js" ))
			.on('end', function(){

				var end 	= process.hrtime(start);
				var words 	= prettyHrtime(end);

				console.log("	   Bundled " + lib.name + '	[ ' + words + ' ]');

				if( templates.length > 0 ){

					runBrowserify();

				} else {

					console.log( '-------------------------------------------' );
					cb();

				}

			});

	}

	runBrowserify();

}

module.exports = browserifyTask;
