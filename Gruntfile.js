'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      options: { jshintrc: '.jshintrc' },
      src: ['Gruntfile.js', 'tasks/**/*.js', 'test/*.js']
    },
    nodeunit: {
      test: ['test/test.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
