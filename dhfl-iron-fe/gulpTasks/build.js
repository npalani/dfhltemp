var runSequence = require('run-sequence');

function build (cb){

    runSequence( 'genTemplates',
                 'browserify',
                 'sass',
                 'toCQ',
                cb );

};

module.exports = build;
