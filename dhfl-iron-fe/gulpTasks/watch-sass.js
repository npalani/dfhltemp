var gulp 		= require( 'gulp' );
var runSequence = require('run-sequence');


function watchSassTask() {

	var scssFiles = [
		'./components/**/styles/**/**.scss',
		'./templates/**/styles/**/**.scss'
	]

	gulp.watch( scssFiles , runSass );

}

function runSass(){

	runSequence(
		'sass',
		'toCQ'
	);

}

module.exports = watchSassTask;
