var gulp 		    = require( 'gulp' );
var inquirer 	    = require( 'inquirer' );
var chalk 		    = require( 'chalk' );
var digest_answers  = require( './component_digest_answers' );

module.exports = function( cb ){



      inquirer.prompt([
                      {
                        type: 'input',
                        name: 'component_name',
                        message: 'What do you want to name this component?'
                    },
                      {
                        type: 'list',
                        name: 'component_type',
                        message: 'What do you wnat to name this component?',
                          choices: [
                              {
                                  name : 'Simple Component',
                                  value : 'simple'
                              } ,
                              {
                                  name : 'Complex Component',
                                  value : 'complex'
                              }
                          ]
                    }
           ]).then(function (answers) {
             digest_answers(answers)
             cb();
        });


//    inquirer.prompt( [
//        {
//			type: 'input',
//			name: 'component_name',
//			message: 'What do you want to name this component?'
//		},
//        {
//			type: 'list',
//			name: 'component_type',
//			message: 'What do you wnat to name this component?',
//            choices: [
//                {
//                    name : 'Simple Component',
//                    value : 'simple'
//                } ,
//                {
//                    name : 'Complex Component',
//                    value : 'complex'
//                }
//            ]
//		}
//	], function ( answers ) {
//
//        digest_answers(answers)
//
//        cb();
//
//	} );

}
