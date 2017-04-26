var gulp 			= require( 'gulp' );
var template 		= require( 'gulp-template' );
var shell 			= require( 'shelljs' );
var fs				= require( 'fs' );
var Handlebars		= require( 'handlebars' );
var chalk			= require( 'chalk' );


module.exports = function ( cb , answers ) {

	// main.js file
	var mainJsSource 	= fs.readFileSync( __dirname + '/templates/main.js.template' ).toString( );
	var mainJsTemplate  = Handlebars.compile( mainJsSource );

	// main.scss file
	var mainScssSource 		= fs.readFileSync( __dirname + '/templates/main.scss.template' ).toString( );
	var mainScssTemplate 	= Handlebars.compile( mainScssSource );

	// config.json file
	var configSource 	= fs.readFileSync( __dirname + '/templates/config.json.template' ).toString( );
	var configTemplate 	= Handlebars.compile( configSource );

	var mainJS 		= mainJsTemplate( answers );
	var mainScss	= mainScssTemplate( answers );
	//var packageJson = packageTemplate( answers );
	var configJSON	= configTemplate( answers );

	var cwd = shell.pwd();

	shell.cd( 'aem-templates' );
	shell.mkdir( answers.template_name );
	shell.cd( answers.template_name );
	shell.mkdir( 'styles' );

	var componentDirPath = shell.pwd();

	fs.writeFileSync( componentDirPath + '/' + answers.template_name + '.js' , mainJS );
	fs.writeFileSync( componentDirPath + '/styles/' + answers.template_name + '.scss' , mainScss );
	fs.writeFileSync( componentDirPath + '/config.json' , configJSON );

	shell.cd( cwd );

	console.log( chalk.bold.green( '\n-----------------------------------------------') );
	console.log( chalk.bold.green( '|' ) );
	console.log( chalk.bold.green( '|   ' ) + chalk.bold.green( 'Created Template' ) + ' : ' + answers.template_name );
	console.log( chalk.bold.green( '|' ) + '   ' + chalk.bold('Files created') );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( answers.template_name + '.js' ) );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( answers.template_name + '.scss' ) );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( 'config.json') );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( answers.template_name + '.components.js' ) );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( answers.template_name + '.components.scss' ) );
	console.log( chalk.bold.green( '|' ) );
	console.log( chalk.bold.green( '-----------------------------------------------\n' ) );

	cb();

}
