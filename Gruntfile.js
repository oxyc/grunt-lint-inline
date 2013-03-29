'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      options: { jshintrc: '.jshintrc' },
      src: ['Gruntfile.js', 'tasks/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};
