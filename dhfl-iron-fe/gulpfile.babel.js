
var gulp = require('gulp');
//import gulp from 'gulp';

// Task includes
var browserify = require('./gulpTasks/browserify');
//import browserify 			from './gulpTasks/browserify';
var build = require('./gulpTasks/build');
//import build 				from './gulpTasks/build';
var create = require('./gulpTasks/create');
//import create 				from './gulpTasks/create';
var generateTemplates = require('./gulpTasks/generate-templates');
//import generateTemplates 	from './gulpTasks/generate-templates'
var moveToCQ = require('./gulpTasks/move-to-cq');
//import moveToCQ 			from './gulpTasks/move-to-cq'
var sass = require('./gulpTasks/sass');
//import sass 				from './gulpTasks/sass';
var eslint = require('./gulpTasks/eslint');
//import eslint 				from './gulpTasks/eslint';
var watchBrowserify = require('./gulpTasks/watch-browserify');
//import watchBrowserify 		from './gulpTasks/watch-browserify';
var watchCQ = require('./gulpTasks/watch-cq');
//import watchCQ 				from './gulpTasks/watch-cq';
var watchSass = require('./gulpTasks/watch-sass');
//import watchSass 			from './gulpTasks/watch-sass';
var watch = require('./gulpTasks/watch');
//import watch 				from './gulpTasks/watch';

// TODO: Delete after R2
var removeOldModules = require('./gulpTasks/removeOldModules');
//import removeOldModules 				from './gulpTasks/removeOldModules';
gulp.task( 'removeOldModules',  		removeOldModules)



gulp.task( 'browserify', ['eslint'],	browserify );
gulp.task( 'build', 					build ) ;
gulp.task( 'create', 					create );
gulp.task( 'genTemplates', 				generateTemplates );
gulp.task( 'toCQ', 						moveToCQ );
gulp.task( 'sass', 						sass );
gulp.task( 'eslint', 					eslint );

gulp.task( 'watch', watch.deps, watch );
	gulp.task( 'watchSass', 		watchSass );
	gulp.task( 'watchBrowserify', 	watchBrowserify );
	gulp.task( 'watchCQ',		 	watchCQ );

gulp.task( 'help' , function(){
	console.log("You can run any of the following tasks");
	for (var taskName in gulp.tasks) {
		if (gulp.tasks.hasOwnProperty(taskName)) {

			var task = gulp.tasks[taskName];
			console.log("   gulp " + taskName);

		}
	}

} )

gulp.task( 'default' , [ 'buildNoInstall' ] );
