module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
      jshint: {
        options: {
          '-W015': true,
        },
        src: ['js/foundation/*.js']
      },
      jasmine: {
        options: {
            keepRunner: true,
            styles: ['test/stylesheets/normalize.css', 'test/stylesheets/foundation.css'],
            vendor: [
                'js/vendor/custom.modernizr.js',
                'js/vendor/jquery.js'
            ]
        },

        section: {
            src: [
                'js/foundation/foundation.js',
                'js/foundation/foundation.section.js'
            ],
            options: {
                specs: 'spec/js/section/**/*Spec.js',
                helpers: [
                    'spec/js/helpers/**/*Helper.js',
                    'spec/js/section/**/*Helper.js'
                ],
                outfile: 'test/_SpecRunner_section.html',
            }
        }
      },
      sass: {
        test: {
            files: {
                'test/stylesheets/normalize.css' : 'scss/normalize.scss',
                'test/stylesheets/foundation.css' : 'scss/foundation.scss'
            }
        }
      },
      watch: {
        css: {
            files: 'scss/**/*.scss',
            tasks: ['sass']
        },
        tests: {
            files: [
                'js/**/*.js',
                'spec/**/*.js'
            ],
            tasks: 'test',
            options: {
                interrupt: true
            }
        }
      }
    });

    grunt.registerTask('test', ['sass:test', 'jasmine:section']);

    grunt.registerTask('travis', ['jshint','jasmine']);

    grunt.registerTask('default', ['test']);
};