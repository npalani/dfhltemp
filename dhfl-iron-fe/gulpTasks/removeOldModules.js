var shell 		    = require( 'shelljs' );

function build (cb){

    shell.cd('components');
    shell.exec('find . -name "node_modules" -delete');
    shell.exec('find . -name "package.json" -delete');
    shell.cd('..');

    cb();
};

module.exports = build;
