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
            options: {
                style: 'expanded'
            },
            target: {
                files: {
                    '<%= paths.assets %>css/style.css' : ['<%= paths.framework %>scss/style.scss']
                }
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            target: {
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
                        browsers: ['> 1%', 'last 3 versions', 'ie 11']
                    })
                ]
            },
            target: {
                src: '<%= paths.assets %>css/style.css'
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            target: {
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
            // options: {
            //     mangle: false
            // },
            target: {
                files: {
                    '<%= paths.assets %>js/main.min.js': ['<%= paths.assets %>js/main.js']
                }
            }
        },

        codekit: {
            options : {
                compilePrefixed : false
            },
            target : {
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
            options: {
                usePrefix: false
            },
            css: {
                options: {
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
                    patterns: [{
                        match: /(icons(.[a-fA-F0-9]+)?\.)/g,
                        replacement: 'icons.'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= paths.assets %>css/style.min*.css'],
                    dest: '<%= paths.assets %>css/'
                }]
            }
        },

        usemin: {
            options: {
                assetsDirs: ['<%= paths.assets %>css', '<%= paths.assets %>js', '<%= paths.assets %>fonts'],
                patterns: {
                    html: [
                        [/(style.min(.[a-fA-F0-9]+)?\.css)/g, 'Replacing reference to style.min.css with the revved version'],
                        [/(main.min(.[a-fA-F0-9]+)?\.js)/g, 'Replacing reference to main.min.js with the revved version']
                    ],
                    css: [
                        [/(icons(.[a-fA-F0-9]+)?\.(eot|otf|svg|ttf|woff2?))/g, 'Replacing reference to icons.* with the revved version']
                    ]
                }
            },
            html: ['<%= paths.cacheBustingSrc %>*.html'],
            css: ['<%= paths.assets %>css/style.min*.css']
        },

        imagemin: {
            webpPNG: {
                options: {
                    use: [
                        require('imagemin-webp')({
                            lossless: true
                        })
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>images/',
                    src: ['**/*.png'],
                    dest: '<%= paths.assets %>images/'
                }]
            },
            webpJPG: {
                options: {
                    use: [
                        require('imagemin-webp')({
                            quality: 65
                        })
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>images/',
                    src: ['**/*.jpg'],
                    dest: '<%= paths.assets %>images/'
                }]
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
                    cwd: '<%= paths.root %>_assets/svg/optimize/src',
                    src: ['**/*.svg'],
                    dest: '<%= paths.root %>_assets/svg/optimize/dist'
                }]
            }
        },

        svgstore: {
            options: {
                prefix : 'icon-',
                // svg: {
                //     style: 'display: none;'
                // },
                formatting : {
                    indent_size : 4
                }
            },
            target: {
                files: {
                    '<%= paths.assets %>images/sprite.svg': ['<%= paths.root %>_assets/svg/sprite/*.svg'],
                },
            },
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
            js: {
                files: ['<%= paths.framework %>js/**/*.js'],
                tasks: ['clean:js','replace:js','concat','uglify','filerev:js','usemin:html']
            },
            iconFont: {
                files: ['<%= paths.assets %>fonts/icons.{eot,otf,svg,ttf,woff,woff2}'],
                tasks: ['clean:iconFont','replace:iconFont','filerev:iconFont','clean:css','replace:css','usemin:css','filerev:css','usemin:html']
            },
            webp: {
                files: ['<%= paths.assets %>images/**/*.{png,jpg}'],
                tasks: ['imagemin']
            },
            svgo: {
                files: ['<%= paths.root %>_assets/svg/optimize/src/**/*.svg'],
                tasks: ['svgmin']
            },
            svgsprite: {
                files: ['<%= paths.root %>_assets/svg/sprite/**/*.svg'],
                tasks: ['svgstore']
            }
        }

    });

    grunt.registerTask('default', 'watch');

};
