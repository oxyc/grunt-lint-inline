/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function (grunt) {

  // External libs.
  var jshint = require('jshint').JSHINT
    , path = require('path');

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('lint-inline', 'Validate inline JS', function () {
    // Get flags and globals, allowing target-specific options and globals to
    // override the default options and globals.
    var options, globals, tmp;

    tmp = grunt.config(['jshint', this.target, 'options']);
    if (typeof tmp === 'object') {
      grunt.verbose.writeln('Using "' + this.target + '" JSHint options.');
      options = tmp;
    } else {
      grunt.verbose.writeln('Using master JSHint options.');
      options = grunt.config('jshint.options');
    }
    grunt.verbose.writeflags(options, 'Options');

    tmp = grunt.config(['jshint', this.target, 'globals']);
    if (typeof tmp === 'object') {
      grunt.verbose.writeln('Using "' + this.target + '" JSHint globals.');
      globals = tmp;
    } else {
      grunt.verbose.writeln('Using master JSHint globals.');
      globals = grunt.config('jshint.globals');
    }
    grunt.verbose.writeflags(globals, 'Globals');

    // Lint specified files.
    grunt.file.expandFiles(this.file.src).forEach(function(filepath) {
      var src = grunt.file.read(filepath)
        , ext = path.extname(filepath);

      if (ext !== '.js' && ext !== '.json' && ext !== '') src = removeHTML(src);
      if (/^\s*$/.test(src)) return;
      grunt.helper('lint', src, options, globals, filepath);
    });

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('Lint free.');
  });

  function removeHTML(src) {
    var lines = src.split('\n');
    if (!(/^\s*</).test(lines[0])) return src;
    var s = false;
    lines.forEach(function(line, i) {
      if ((/\s*<\/?script/i).test(line)) {
        if (!((/<script/i).test(line) && (/<\/script/i).test(line))) {
          //take only inline scripts
          s = !s;
          lines[i] = '';
        }
      }
      if (!s) {
        lines[i] = '';
      }
    });

    return lines.join('\n');
  }
};
