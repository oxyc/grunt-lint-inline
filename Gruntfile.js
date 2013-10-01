'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      options: { jshintrc: '.jshintrc' },
      src: ['Gruntfile.js', 'tasks/**/*.js', 'test/*.js']
    },
    nodeunit: {
      test: ['test/test.js']
    },
    watch: {
      scripts: {
        files: ['<%= jshint.src %>'],
        tasks: ['jshint', 'test']
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
