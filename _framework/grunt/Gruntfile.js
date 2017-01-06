module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // pkg: grunt.file.readJSON('package.json'),

        paths: {
            framework: '../',
            root: '../../',
            assets: '../../static/',
            kitTemplatesDest: '../../',
            cacheBustingSrc: '../../'
        },

        sass: {
            target: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= paths.assets %>css/style.css' : ['<%= paths.framework %>scss/style.scss']
                }
            }
        },

        cssmin: {
            target: {
                options: {
                    keepSpecialComments: 0
                },
                // files: {
                //     '<%= paths.assets %>css/style.min.css': ['<%= paths.assets %>css/style.css']
                // }
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>css',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: '<%= paths.assets %>css',
                    ext: '.min.css'
                }]
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        map: true,
                        remove: false,
                        browsers: ['> 1%', 'last 3 versions', 'ie 9']
                    })
                ]
            },
            dist: {
                src: '<%= paths.assets %>css/style.css'
            }
        },

        concat: {
            target: {
                options: {
                    separator: ';'
                },
                files: {
                    // '<%= paths.assets %>js/main.js':  [
                    //                                 '<%= paths.framework %>js/helpers/util.js',
                    //                                 '<%= paths.framework %>js/main.js'
                    //                             ]
                    '<%= paths.assets %>js/main.js': ['<%= paths.framework %>js/main.js']
                }
            }
        },

        uglify: {
            target: {
                // options: {
                //     mangle: false
                // },
                files: {
                    '<%= paths.assets %>js/main.min.js': ['<%= paths.assets %>js/main.js']
                }
            }
        },

        codekit: {
            target : {
                options : {
                    compilePrefixed : false
                },
                files : {
                    '<%= paths.kitTemplatesDest %>' : ['<%= paths.framework %>kit/**/*.kit']
                }
            }
        },

        clean: {
            options: {
                force: true
            },
            css: '<%= paths.assets %>css/style.min.*.css',
            js: '<%= paths.assets %>js/main.min.*.js',
            iconFont: '<%= paths.assets %>fonts/icons.*.{eot,otf,svg,ttf,woff,woff2}'
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5'
            },
            css: {
                files: [{
                    src: '<%= paths.assets %>css/style.min.css',
                    dest: '<%= paths.assets %>css/'
                }]
            },
            js: {
                files: [{
                    src: '<%= paths.assets %>js/main.min.js',
                    dest: '<%= paths.assets %>js/'
                }]
            },
            iconFont: {
                files: [{
                    src: '<%= paths.assets %>fonts/icons.{eot,otf,svg,ttf,woff,woff2}',
                    dest: '<%= paths.assets %>fonts/'
                }]
            }
        },

        replace: {
            css: {
                options: {
                    usePrefix: false,
                    patterns: [{
                        match: /(style.min(.[a-fA-F0-9]+)?\.css)/g,
                        replacement: 'style.min.css'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= paths.cacheBustingSrc %>',
                    src: ['*.html'],
                    dest: '<%= paths.cacheBustingSrc %>'
                }]
            },
            js: {
                options: {
                    usePrefix: false,
                    patterns: [{
                        match: /(main.min(.[a-fA-F0-9]+)?\.js)/g,
                        replacement: 'main.min.js'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= paths.cacheBustingSrc %>',
                    src: ['*.html'],
                    dest: '<%= paths.cacheBustingSrc %>'
                }]
            },
            iconFont: {
                options: {
                    usePrefix: false,
                    patterns: [{
                        match: /(icons(.[a-fA-F0-9]+)?\.)/g,
                        replacement: 'icons.'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['../../static/css/style.min*.css'],
                    dest: '../../static/css/'
                }]
            }
        },

        usemin: {
            html: ['<%= paths.cacheBustingSrc %>*.html'],
            css: ['../../static/css/style.min*.css'],
            options: {
                assetsDirs: ['<%= paths.assets %>css', '<%= paths.assets %>js', '../../static/fonts'],
                patterns: {
                    html: [
                        [/(style.min(.[a-fA-F0-9]+)?\.css)/g, 'Replacing reference to style.min.css with the revved version'],
                        [/(main.min(.[a-fA-F0-9]+)?\.js)/g, 'Replacing reference to main.min.js with the revved version']
                    ],
                    css: [
                        [/(icons(.[a-fA-F0-9]+)?\.(eot|otf|svg|ttf|woff2?))/g, 'Replacing reference to icons.* with the revved version']
                    ]
                }
            }
        },

        svgmin: {
            options: {
                plugins: [
                    {removeViewBox: false},
                    {removeUselessStrokeAndFill: false}
                ]
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.root %>_assets/svg/original',
                    src: ['**/*.svg'],
                    dest: '<%= paths.root %>_assets/svg/compressed'
                }]
            }
        },

        //In order to not cache bust your assets delete every clean, replace, usemin and filerev tasks below.
        watch: {
            html: {
                files: ['<%= paths.framework %>kit/**/*.kit'],
                tasks: ['codekit','usemin:html']
            },
            css: {
                files: ['<%= paths.framework %>scss/**/*.scss'],
                tasks: ['clean:css','replace:css','sass','postcss','cssmin','usemin:css','filerev:css','usemin:html']
            },
            js:{
                files: ['<%= paths.framework %>js/**/*.js'],
                tasks: ['clean:js','replace:js','concat','uglify','filerev:js','usemin:html']
            },
            iconFont:{
                files: ['../../static/fonts/icons.{eot,otf,svg,ttf,woff,woff2}'],
                tasks: ['clean:iconFont','replace:iconFont','filerev:iconFont','clean:css','replace:css','usemin:css','filerev:css','usemin:html']
            },
            svg:{
                files: ['<%= paths.root %>_assets/svg/original/**/*.svg'],
                tasks: ['svgmin']
            }
        }

    });

    grunt.registerTask('default', ['watch']);

};
