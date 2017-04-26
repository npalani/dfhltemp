var gulp 		    = require( 'gulp' );
var template 	    = require( 'gulp-template' );
var shell 		    = require( 'shelljs' );
var fs			    = require( 'fs' );
var Handlebars	    = require( 'handlebars' );
var chalk		    = require( 'chalk' );
var inquirer 	    = require( 'inquirer' );
var chalk 		    = require( 'chalk' );

var componentsObj   = require( './../../../gulp-utilities/buildComponentsObj' )();
var digest_answers  = require( './template_digest_answers' );

module.exports = function ( cb , clientlib ) {

    if( clientlib === undefined ){
        var hasClientLib = false;
    } else {
        var hasClientLib = true;
    }
    inquirer.prompt([
                {
                    type    : 'input',
                    name    : 'template_name',
                    message : 'What do you want to name this template?',
                    when    : function(){
                        return !hasClientLib;
                    }
                },
                {
                    type 	: 'confirm',
                    name 	: 'auto_generate_styles',
                    message : 'Do you want to auto generate the styles for this template?'
                },
                {
                    type 	: 'confirm',
                    name 	: 'auto_generate_js',
                    message : 'Do you want to auto generate the javascript for this template?'
                },
                {
                    type : 'confirm',
                    name : 'has_clientlib',
                    message : 'Does the client library already exist for this template?',
                    when    : function(){
                        return !hasClientLib;
                    }
                },
                {
                    type    : 'list',
                    name    : 'clientlibs_root_path',
                    message : 'Where is the template client library located?',
                    choices : [
                        {
                            name    : 'apps',
                            value   : '../ui.apps/src/main/content/jcr_root/apps'
                        },
                        {
                            name    : 'etc',
                            value   : '../ui.apps/src/main/content/jcr_root/etc'
                        }
                    ],
                    when    : function(){
                        return !hasClientLib;
                    }
                },
                {
                    type    : 'input',
                    name    : 'clientlibs_path',
                    message : 'What is the rest of the path to your client libs after apps?',
                    when    : function( answers ){
                        return (answers.clientlibs_root_path === '../ui.apps/src/main/content/jcr_root/apps') && !hasClientLib;
                    }
                },
                {
                    type    : 'input',
                    name    : 'clientlibs_path',
                    message : 'What is the rest of the path to your client libs after etc?',
                    when    : function( answers ){
                        return (answers.clientlibs_root_path === '../ui.apps/src/main/content/jcr_root/etc') && !hasClientLib;
                    }
                },
                {
                    type        : 'checkbox',
                    name        : 'components_to_include',
                    message     : 'Which components do you want to include? (Default None)',
                    choices     : componentsObj.componentNames.filter( function( item ){
                        var returnVal = false;

                        if( !item.isGlobal && item.name != 'componentInitializer' && item.name != 'page-scraper' ){
                            returnVal = true;
                        }

                        return returnVal;
                    } )

                }
            ]).then(function (answers) {

            if( hasClientLib ){
                answers.template_name = clientlib.clientlib_name;
                answers.has_clientlib = true;
                answers.clientlibs_root_path = clientlib.clientlibs_root_path;
                answers.clientlibs_path = clientlib.clientlibs_path;
            }

             digest_answers( cb, answers )

        });
}
