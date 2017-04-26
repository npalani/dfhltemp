var gulp 		= require( 'gulp' );
var template 	= require( 'gulp-template' );
var shell 		= require( 'shelljs' );
var fs			= require( 'fs' );
var Handlebars	= require( 'handlebars' );
var chalk		= require( 'chalk' );


module.exports = function ( answers ) {

	// Main js file rendering
	var mainJsSource 	= fs.readFileSync( __dirname + '/templates/main.js.template' ).toString( );
	var mainJSTemplate	= Handlebars.compile( mainJsSource );

	// Main js Simple file rendering
	var mainJsSourceSimp 	= fs.readFileSync( __dirname + '/templates/main-simple.js.template' ).toString( );
	var mainJSTemplateSimp	= Handlebars.compile( mainJsSourceSimp );

	// main.scss file
	var mainScssSource 		= fs.readFileSync( __dirname + '/templates/main.scss.template' ).toString( );
	var mainScssTemplate 	= Handlebars.compile( mainScssSource );

	var mainJS 				= mainJSTemplate( answers );
	var mainJSSimp			= mainJSTemplateSimp( answers );
	var mainScss 			= mainScssTemplate( answers );

	var cwd 				= shell.pwd();

	shell.cd( 'components' );
	shell.mkdir( answers.component_name );
	shell.cd( answers.component_name );
	shell.mkdir( 'styles' );

	var componentDirPath = shell.pwd();

	console.log(answers.component_type);

	if( answers.component_type == 'complex' ){
		fs.writeFileSync( componentDirPath + '/' + answers.component_name + '.js' , mainJS );
	} else {
		fs.writeFileSync( componentDirPath + '/' + answers.component_name + '.js' , mainJSSimp );
	}

	fs.writeFileSync( componentDirPath + '/styles/' + answers.component_name + '.scss' , mainScss );

	shell.cd( cwd );

	console.log( chalk.bold.green( '\n-----------------------------------------------') );
	console.log( chalk.bold.green( '|' ) );
	console.log( chalk.bold.green( '|   ' ) + chalk.bold.green( 'Created Component' ) + ' : ' + answers.component_name );
	console.log( chalk.bold.green( '|' ) + '   ' + chalk.bold('Files created') );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( answers.component_name + '.js') );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( answers.component_name + '.scss') );
	console.log( chalk.bold.green( '|' ) );
	console.log( chalk.bold.green( '-----------------------------------------------\n' ) );

}
