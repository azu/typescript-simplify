// LICENSE : MIT
"use strict";
var through = require('through');
var path = require('path');
var TypeScriptSimple = require('typescript-simple').TypeScriptSimple;

/**
 * is target file?
 * @param filePath
 * @returns {boolean}
 */
function isTransformTarget(filePath) {
    if (path.extname(filePath) === ".ts") {
        return true;
    }
}

// Limitation: typescript-simple can
// not compile multiple source files.
// suppress compile warning.
/**
 * Apply typescript-simple through the browserify transform chain.
 * Important!: typescript-simple suppress compiler warnings by default.
 *
 * @param {String} filePath
 * @param {Object} options
 * @return {Stream}
 */
var browserify = module.exports = function (filename, opts) {
    return browserify.configure(opts)(filename);
};
browserify.configure = function (options) {
    var tss = new TypeScriptSimple(options, false);
    return function compileTypeScript(filePath) {
        if (!isTransformTarget(filePath)) {
            return through();
        }

        var data = '';
        var stream = through(write, end);

        function write(buf) {
            data += buf;
        }

        function end() {
            stream.queue(tss.compile(data, filePath));
            stream.queue(null);
        }

        return stream;
    };

};
