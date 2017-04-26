var gulp        = require( 'gulp' );
var runSequence = require('run-sequence');

function watchTask() {

    try{
        runSequence( 'watchSass',
                     'watchBrowserify',
                     'watchCQ'
                    );
    } catch(err){

        console.error( err );

    }
}

watchTask.deps = ['build'];

module.exports = watchTask;
