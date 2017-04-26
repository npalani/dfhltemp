 "use strict";
var fs 			= require( 'fs' );
var shell		= require( 'shelljs' );
var path 		= require( 'path' );
var _ 			= require( 'underscore' );
var config 		= require( './../config.json' );
var chalk 		= require( 'chalk' );

module.exports = () => {

	var templatesArray = fs.readdirSync( 'aem-templates' )
		.filter( function ( dir ) {
			// return true if `dir` does not start with a `.`
			// to avoid dotfiles causing ENOTDIR (not a directory) errors
			return !dir.match( /^\.[\w -]/ );
		} );

	var templates = {
		templateNames: [],
		templateCount: templatesArray.length,
		templatePaths: [],
		templates: {}
	};

	for ( let i = 0; i < templatesArray.length; i++ ) {

		let template = {
			components : []
		};

		template.name = templatesArray[ i ];
		template.path = 'aem-templates/' + template.name;
		template.main = template.name + ".js";

		let hasConfig = fs.existsSync( './' + template.path + '/config.json' );

		if ( hasConfig ) {
			template.config = require( './../' + template.path + '/config.json' );
		} else {
			let error = 'Confg json file is required. Your template located here: ' +
				chalk.bgRed.white( template.path ) + ' is missing the config.';
			console.log( error );
 		}


		if ( fs.existsSync( path.resolve( template.config.clientLibPath ) ) ) {
			template.config.clientLibPath = path.resolve( template.config.clientLibPath );
		} else {
			let error = 'Please defign a valid path to the template\'s clientlib in the config.json for : ' +
				chalk.bgRed.white( template.path );
			throw error
		}

		for( let i in template.config.components ){

			let component = template.config.components[ i ];

			template.components.push( {
				name 	 : component,
				isGlobal : component === 'global'
			} );

		}


		templates.templates[ template.name ] = template;

		templates.templateNames.push( template.name );

	}

	templates.templatePaths = _.union( templates.templatePaths, config.dontWatch );

	return templates;
}
