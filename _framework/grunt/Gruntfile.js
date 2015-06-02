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
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: '../../static/css',
                    ext: '.min.css'
                }]
            }
        },

        concat: {
            target: {
                options: {
                    separator: ';'
                },
                files: {
                    // '../../static/js/main.js': ['../js/helper/util.js','../js/main.js']
                    '../../static/js/main.js': ['../js/main.js']
                }
            }
        },

        uglify: {
            target: {
                // options: {
                //     mangle: false
                // },
                files: {
                    '../../static/js/main.min.js': ['../../static/js/main.js']
                }
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        map: true,
                        remove: false,
                        browsers: ['> 1%', 'last 3 versions', 'ie 9']
                    })
                ]
            },
            dist: {
                src: '../../static/css/style.css'
            }
        },

        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    },
                    {
                        removeUselessStrokeAndFill: false
                    }
                ]
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '../../_assets/svg/original',
                    src: ['**/*.svg'],
                    dest: '../../_assets/svg/compressed'
                }]
            }
        },

        watch: {
            html: {
                files: ['../kit/**/*.kit'],
                tasks: ['codekit']
            },
            css: {
                files: ['../scss/**/*.scss'],
                tasks: ['sass','postcss','cssmin']
            },
            js:{
                files: ['../js/**/*.js'],
                tasks: ['concat','uglify']
            },
            svg:{
                files: ['../../_assets/svg/original/**/*.svg'],
                tasks: ['svgmin']
            }
        }

    });

    grunt.registerTask('default', ['watch','sass','postcss','cssmin','concat','uglify','codekit','svgmin']);

};
