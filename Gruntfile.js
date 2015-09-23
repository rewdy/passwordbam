module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', '> 2% in US']
      },
      single_file: {
        src: 'css/style.css',
        dest: 'css/style.processed.css'
      }
    },
    cssmin: {
      target: {
        files: {
          'css/style.min.css': 'css/style.processed.css'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'js/script.min.js': 'js/script.js'
        }
      }
    },
    watch: {
      files: ['scss/**/*.scss', 'js/script.js'],
      tasks: [
        'sass',
        'autoprefixer',
        'cssmin',
        'uglify'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify']);

}