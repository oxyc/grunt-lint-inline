/*globals module:true */
module.exports = function (grunt) {
  'use strict';

  function readOptionalJSON(filepath) {
    var data = {};
    try {
      data = grunt.file.readJSON(filepath);
      grunt.verbose.write('Reading ' + filepath + '...').ok();
    } catch(e) {}
    return data;
  }

  grunt.initConfig({
    // Linting
    lint: {
      src: ['grunt.js', 'tasks/*.js']
    },
    jshint: {
      options: readOptionalJSON('.jshintrc')
    }
  });

  grunt.registerTask('default', 'lint');
};
