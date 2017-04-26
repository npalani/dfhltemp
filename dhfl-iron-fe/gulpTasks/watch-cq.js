var gulp        = require( 'gulp' );
var slang       = require( 'node-slang' );
var watch       = require( 'gulp-watch' );
var notifier    = require( 'node-notifier')

var jcr_location = '../ui.apps/src/main/content/jcr_root';

var filesToWatch    = [
    jcr_location + '/**/*.html' ,
    jcr_location + '/**/*.jsp'  ,
    jcr_location + '/**/*.css'  ,
    jcr_location + '/**/*.less' ,
    jcr_location + '/**/*.js'   ,
    jcr_location + '/**/*.json' ,
    jcr_location + '/**/*.txt'
];

function slangIt (e){
    setTimeout( ()=>{

        slang( e , { port : 4502 } );
        slang( e , { port : 4503 } );

        var file = e.path.split('/');
        file.splice( 0, file.length - 1 )

        notifier.notify({
          'title': 'File Pushed To AEM',
          'message': file[0]
        });
        
    } , 1000 );



}

module.exports = function( ){

    watch( filesToWatch , slangIt);

}
