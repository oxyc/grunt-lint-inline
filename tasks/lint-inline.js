'use strict';

module.exports = function (grunt) {

  var jshint = require('grunt-contrib-jshint/tasks/lib/jshint').init(grunt)
    , path = require('path');

  function removeHTML(src) {
    var lines = src.split('\n')
      , s = false;

    lines.forEach(function(line, i) {
      if ((/<\/?script/i).test(line)) {
        if (!((/<script/i).test(line) && (/<\/script/i).test(line))) {
          // take only inline scripts
          s = !s;
          lines[i] = '';
        }
      }
      if (!s) lines[i] = '';
    });

    return lines.filter(Boolean).join('\n');
  }

  grunt.registerMultiTask('inlinelint', 'Validate inline JS', function () {
    var options = this.options({ force: false });
    if (options.jshintrc) options = grunt.file.readJSON(options.jshintrc);
    if (!options.globals) options.globals = {};
    if (options.predef) {
      options.predef.forEach(function(key) {
        options.globals[key] = true;
      });
      delete options.predef;
    }
    var globals = options.globals;
    delete options.globals;
    var force = options.force;
    delete options.force;

    grunt.verbose.writeflags(options, 'JSHint options');
    grunt.verbose.writeflags(globals, 'JSHint globals');

    var files = this.filesSrc;
    files.forEach(function(filepath) {
      var source = grunt.file.read(filepath);
      source = removeHTML(source);
      if (/^\s*$/.test(source)) return; // Skip files without JavaScript.
      jshint.lint(source, options, globals, filepath);
    });

    if (this.errorCount) { return force; }
    grunt.log.ok(files.length + ' file' + (files.length === 1 ? '' : 's') + ' lint free.');
  });
};
