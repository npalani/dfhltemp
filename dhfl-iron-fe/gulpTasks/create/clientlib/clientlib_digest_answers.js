var gulp 		= require( 'gulp' );
var template 	= require( 'gulp-template' );
var shell 		= require( 'shelljs' );
var fs			= require( 'fs' );
var Handlebars	= require( 'handlebars' );
var chalk		= require( 'chalk' );
var createTemp  = require( './../template/template');


module.exports = function ( cb, answers ) {

	// .content.xml file rendering
	var contentXML             = fs.readFileSync( __dirname + '/templates/.content.xml.template' ).toString( );
	var contentXMLTemplate     = Handlebars.compile( contentXML );

	// css.txt file rendering
	var cssTxt 	           = fs.readFileSync( __dirname + '/templates/css.txt.template' ).toString( );
	var cssTxtTemplate     = Handlebars.compile( cssTxt );

    // js.txt file rendering
	var jsTxt 	           = fs.readFileSync( __dirname + '/templates/js.txt.template' ).toString( );
	var jsTxtTemplate      = Handlebars.compile( jsTxt );

	var contentXMLComp     = contentXMLTemplate( answers );
	var cssTxtComp         = cssTxtTemplate( answers );
	var jsTxtComp          = jsTxtTemplate( answers );

    var cwd = shell.pwd();

	shell.cd( answers.clientlibs_root_path + answers.clientlibs_path );
	shell.mkdir( answers.clientlib_name );
	shell.cd( answers.clientlib_name );
	shell.mkdir( 'css' );
	shell.mkdir( 'js' );

	var clientLibsPath = shell.pwd();

	fs.writeFileSync( clientLibsPath + '/.content.xml' , contentXMLComp );
	fs.writeFileSync( clientLibsPath + '/css.txt' , cssTxtComp );
	fs.writeFileSync( clientLibsPath + '/js.txt' , jsTxtComp );

    shell.cd( cwd );

	console.log( chalk.bold.green( '\n-----------------------------------------------') );
	console.log( chalk.bold.green( '|' ) );
	console.log( chalk.bold.green( '|   ' ) + chalk.bold.green( 'Created Clientlibs' ) + ' : ' + answers.clientlib_name );
	console.log( chalk.bold.green( '|' ) + '   ' + chalk.bold('Files created') );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( '.content.xml' ) );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( 'css.txt') );
	console.log( chalk.bold.green( '|' ) + '   	- ' + chalk.bold( 'js.txt') );
	console.log( chalk.bold.green( '|' ) );
	console.log( chalk.bold.green( '-----------------------------------------------\n' ) );


    if( answers.create_template ){
        createTemp( cb, answers );
    } else {
        cb();
    }

}
