 "use strict";
var gulp 		    = require( 'gulp' );
var template 	    = require( 'gulp-template' );
var shell 		    = require( 'shelljs' );
var fs			    = require( 'fs' );
var Handlebars	    = require( 'handlebars' );
var chalk		    = require( 'chalk' );
var inquirer 	    = require( 'inquirer' );
var chalk 		    = require( 'chalk' );

var templatesObj    = require( './../../../gulp-utilities/buildTemplatesObj' )();
var digest_answers  = require( './clientlib_digest_answers' );

module.exports = function ( cb ) {


    inquirer.prompt([
                            {
                                type    : 'input',
                                name    : 'clientlib_name',
                                message : 'What do you want to name this clientlib?'
                            },
                            {
                                type    : 'input',
                                name    : 'clientlib_category',
                                message : 'What do you want base category of this clientlib to be?'
                            },
                            {
                                type    : 'list',
                                name    : 'clientlibs_root_path',
                                message : 'Where do you want to place the clientlib?',
                                choices : [
                                    {
                                        name    : 'apps',
                                        value   : '../ui.apps/src/main/content/jcr_root/apps/'
                                    },
                                    {
                                        name    : 'etc',
                                        value   : '../ui.apps/src/main/content/jcr_root/etc/'
                                    }
                                ]
                            },
                            {
                                type    : 'input',
                                name    : 'clientlibs_path',
                                message : 'What is the rest of the path to your client libs after apps?',
                                when    : function( answers ){
                                    return answers.clientlibs_root_path === '../ui.apps/src/main/content/jcr_root/apps/';
                                }
                            },
                            {
                                type    : 'input',
                                name    : 'clientlibs_path',
                                message : function( answers ){
                                    var message = 'What is the rest of the path to your client libs after etc? \n' + answers.clientlibs_root_path;
                                    return message;
                                },
                                when    : function( answers ){
                                    return answers.clientlibs_root_path === '../ui.apps/src/main/content/jcr_root/etc/';
                                }
                            },
                            {
                                type        : 'confirm',
                                name        : 'create_template',
                                message     : 'Would you like to create a template with the same name?',
                            }
                    	]).then(function (answers) {
                          digest_answers( cb , answers )
    });




//    inquirer.prompt( [
//        {
//            type    : 'input',
//            name    : 'clientlib_name',
//            message : 'What do you want to name this clientlib?'
//        },
//        {
//            type    : 'input',
//            name    : 'clientlib_category',
//            message : 'What do you want base category of this clientlib to be?'
//        },
//        {
//            type    : 'list',
//            name    : 'clientlibs_root_path',
//            message : 'Where do you want to place the clientlib?',
//            choices : [
//                {
//                    name    : 'apps',
//                    value   : '../ui.apps/src/main/content/jcr_root/apps/'
//                },
//                {
//                    name    : 'etc',
//                    value   : '../ui.apps/src/main/content/jcr_root/etc/'
//                }
//            ]
//        },
//        {
//            type    : 'input',
//            name    : 'clientlibs_path',
//            message : 'What is the rest of the path to your client libs after apps?',
//            when    : function( answers ){
//                return answers.clientlibs_root_path === '../ui.apps/src/main/content/jcr_root/apps/';
//            }
//        },
//        {
//            type    : 'input',
//            name    : 'clientlibs_path',
//            message : function( answers ){
//                var message = 'What is the rest of the path to your client libs after etc? \n' + answers.clientlibs_root_path;
//                return message;
//            },
//            when    : function( answers ){
//                return answers.clientlibs_root_path === '../ui.apps/src/main/content/jcr_root/etc/';
//            }
//        },
//        {
//            type        : 'confirm',
//            name        : 'create_template',
//            message     : 'Would you like to create a template with the same name?',
//        }
//	], function ( answers ) {
//
//        digest_answers( cb , answers )
//
//	} );

}
