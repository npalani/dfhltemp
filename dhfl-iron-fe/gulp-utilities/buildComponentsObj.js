 "use strict";
var fs 		= require( 'fs' );
var path 	= require( 'path' );
var _ 		= require( 'underscore' );
var config 	= require( './../config.json' );
var chalk 	= require( 'chalk' );

module.exports = function () {


	var componentsArray = fs.readdirSync( 'components' )
		.filter( function ( dir ) {
			// return true if `dir` does not start with a `.`
			// to avoid dotfiles causing ENOTDIR (not a directory) errors
			return !dir.match( /^\.[\w -]/ );
		} );

	var components = {
		componentNames	: [],
		components		: {}
	};

	for ( var i = 0; i < componentsArray.length; i++ ) {

		var component = {};

		component.name = componentsArray[ i ];
		component.path = 'components/' + component.name;
		component.main = component.name + ".js";

		components.componentNames.push( {
			name 	 : component.name,
			isGlobal : component.name === 'global'
		} );


		components.components[ component.name ] = component;


	}

	components.componentPaths = _.union( components.componentPaths, config.dontWatch );

	return components;
}
