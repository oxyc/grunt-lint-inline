'use strict';

module.exports = function (grunt) {

  var jshint = require('grunt-contrib-jshint/tasks/lib/jshint').init(grunt)
    , lintinline = require('./lib/lint-inline')
    , path = require('path');

  // Copied from grunt-contrib-jshint
  grunt.registerMultiTask('inlinelint', 'Validate inline JS', function () {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: false,
      reporterOutput: null,
    });

    // Report JSHint errors but dont fail the task
    var force = options.force;
    delete options.force;

    // Whether to output the report to a file
    var reporterOutput = options.reporterOutput;
    delete options.reporterOutput;

    // Hook into stdout to capture report
    var output = '';
    if (reporterOutput) {
      grunt.util.hooker.hook(process.stdout, 'write', {
        pre: function(out) {
          output += out;
          return grunt.util.hooker.preempt();
        }
      });
    }

    // Create temporary files for the inline javascript and wrap the reporter
    // to use the real file paths.
    var tempFiles = lintinline.wrapReporter(jshint, options, this.filesSrc);

    // Iterate over the temp files instead of this.filesSrc
    jshint.lint(tempFiles, options, function(results, data) {
      var failed = results.length > 0;

      // Write the output of the reporter if wanted
      if (reporterOutput) {
        grunt.util.hooker.unhook(process.stdout, 'write');
        reporterOutput = grunt.template.process(reporterOutput);
        var destDir = path.dirname(reporterOutput);
        if (!grunt.file.exists(destDir)) {
          grunt.file.mkdir(destDir);
        }
        grunt.file.write(reporterOutput, output);
        grunt.log.ok('Report "' + reporterOutput + '" created.');
      }

      // has to be after the eventual reporter output since 'usingGruntReporter' 
      // is true due to reporter reset in wrapReporter to enable mapping file names
      if (failed) {
        // Fail task if errors were logged except if force was set.
        failed = force;
      } else {
        if (jshint.usingGruntReporter === true && data.length > 0) {
          grunt.log.ok(data.length + ' file' + (data.length === 1 ? '' : 's') + ' lint free.');
        }
      }

      done(failed);
    });
  });
};
