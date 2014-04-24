var gutil       = require('gulp-util'),
    requirejs   = require('requirejs'),
    PluginError = gutil.PluginError,
    File        = gutil.File,
    es          = require('event-stream')

// Consts
const PLUGIN_NAME = 'gulp-requirejs';


module.exports = function(opts) {

    'use strict';

    if (!opts) {
        throw new PluginError(PLUGIN_NAME, 'Missing options array!');
    }

    if (!opts.out && typeof opts.out !== 'string') {
        throw new PluginError(PLUGIN_NAME, 'Only single file outputs are supported right now, please pass a valid output file name!');
    }

    if (!opts.baseUrl) {
        throw new PluginError(PLUGIN_NAME, 'Pipeing dirs/files is not supported right now, please specify the base path for your script.');
    }

    // create the stream and save the file name (opts.out will be replaced by a callback function later)
    var _s     = es.pause(),
        _fName = opts.out;

    // just a small wrapper around the r.js optimizer, we write a new gutil.File (vinyl) to the Stream, mocking a file, which can be handled
    // regular gulp plugins (i hope...).
    
    // try {
        optimize(opts, function(text) {
            _s.write(new File({
                path: _fName,
                contents: new Buffer(text)
            }));
        });
    // } catch (err) {
    //     _s.emit('error', err);
    // }

    

    // return the stream for chain .pipe()ing
    return _s;
}

// a small wrapper around the r.js optimizer
function optimize(opts, cb) {
    opts.out = cb;
    opts.optimize = 'none';
    requirejs.optimize(opts);
}