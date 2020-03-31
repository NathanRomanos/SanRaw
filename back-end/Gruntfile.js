module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'index.js',
        dest: 'index.min.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/script.js'],
      options:{
        esversion : 6
      }
    },

    watch: {
    scripts: {
      files: ['Gruntfile.js','js/script.js'],
      tasks: ['jshint'],
      options: {
        spawn: false,
        },
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch'], ['jshint']);

};
