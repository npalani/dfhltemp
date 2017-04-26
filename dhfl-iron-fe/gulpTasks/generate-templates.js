var gulp        = require( 'gulp' );
var shell 		= require( 'shelljs' );
var fs			= require( 'fs' );
var Handlebars	= require( 'handlebars' );
var chalk		= require( 'chalk' );

var config          = require('../config.json');

var jsSource        = fs.readFileSync( __dirname + '/generate-templates/main.js.template' ).toString( );;
var jsTemplate      = Handlebars.compile( jsSource );

var cssSource       = fs.readFileSync( __dirname + '/generate-templates/main.css.template' ).toString( );;
var cssTemplate     = Handlebars.compile( cssSource );

function generateTemplates ( cb ) {
    var templatesObj    = require( './../gulp-utilities/buildTemplatesObj' )();

    var workingDir = shell.pwd();
    var defaultComponents = config.defaultComponents.map( function( component ){
        return { name : component , isGlobal : true }
    } );

    for( var templateName in templatesObj.templates ){

        var template = templatesObj.templates[ templateName ];

        var components = defaultComponents.concat(template.components);

        var data = {
            template_name : template.name,
            components    : components
        }

        if( template.config.autoGenerate.js ){

            var mainJS      = jsTemplate( data );
            var jsFilePath  = workingDir + '/aem-templates/' + template.name + '/' + template.name + '.components.js';
            fs.writeFileSync( jsFilePath , mainJS );

        }

        if( template.config.autoGenerate.styles ){

            var mainCss = cssTemplate( data );
            var cssFilePath = workingDir + '/aem-templates/' + template.name + '/styles/' + template.name + '.components.scss';
            fs.writeFileSync( cssFilePath , mainCss );

        }

        if( templateName == templatesObj.templateNames[ templatesObj.templateNames.length - 1 ] ){

            if( cb ){
                cb();
            }

        }

    }

}


generateTemplates.deps = [];

module.exports = generateTemplates;
