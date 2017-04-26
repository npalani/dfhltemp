var gulp 		= require( 'gulp' );
var runSequence = require('run-sequence');


function watchBrowserifyTask() {

	var jsToWatch = [
		'components/**/**.js',
		'components/**/**.jsx',
		'!components/**/node_modules',
	]

	gulp.watch( jsToWatch, runBrowserify );

}

function runBrowserify ( ) {

	runSequence(
		'browserify',
		'toCQ'
	)

}

module.exports = watchBrowserifyTask;
