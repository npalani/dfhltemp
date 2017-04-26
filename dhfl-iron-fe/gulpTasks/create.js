var gulp 		= require( 'gulp' );
var inquirer 	= require( 'inquirer' );
var chalk 		= require( 'chalk' );

var create_clientlib 	= require( './create/clientlib/clientlib' );
var create_component 	= require( './create/component/component' );
var create_template 	= require( './create/template/template' );

var update =  require('draftlog').into(console);
function create( cb ) {
    inquirer.prompt([{
        type 	: 'list',
        name 	: 'create_choice',
        message : 'What do you want to create?',
        choices : [ 'Component' , 'Template' , 'Client Library' ]
    }]).then(function (answers) {
        if ( answers.create_choice === 'Component' ) {
            create_component( cb );
        }
        if ( answers.create_choice === 'Template' ) {
            create_template( cb );
        }
        if ( answers.create_choice === 'Client Library' ) {
            create_clientlib( cb );
        }
    });
}

create.deps = [];

module.exports = create;
