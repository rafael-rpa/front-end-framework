/*global module:false*/
module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            target: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '../../static/css/style.css' : ['../scss/style.scss']
                }
            }
        },

        codekit: {
            target : {
                options : {
                    compilePrefixed : false
                },
                files : {
                    '../../' : ['../kit/**/*.kit']
                }
            }
        },

        cssmin: {
            target: {
                options: {
                    keepSpecialComments: 0
                },
                // files: {
                //     '../../static/css/style.min.css': ['../../static/css/style.css']
                // }
                files: [{
                    expand: true,
                    cwd: '../../static/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '../../static/css',
                    ext: '.min.css'
                }]
            }
        },

        uglify: {
            target: {
                // options: {
                //     mangle: false
                // },
                files: {
                    '../../static/js/main.min.js': ['../js/main.js']
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    map: true,
                    // remove: false,
                    browsers: ['> 1%', 'last 3 versions', 'ie 9']
                },
                src: '../../static/css/style.css'
            }
        },

        watch: {
            html: {
                files: ['../kit/**/*.kit'],
                tasks: ['codekit']
            },
            css: {
                files: ['../scss/**/*.scss'],
                tasks: ['sass','cssmin','autoprefixer']
            },
            js:{
                files: ['../js/**/*.js'],
                tasks: ['uglify']
            }
        }

    });

    grunt.registerTask('default', ['watch','sass','codekit','cssmin','uglify','autoprefixer']);

};
