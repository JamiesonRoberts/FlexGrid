'use strict';
// Core Gulp
var gulp            = require('gulp'),
    rename          = require('gulp-rename'),
    argv            = require('yargs').argv;

// General Plugins
var source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    newer           = require('gulp-newer'),
    es              = require('event-stream');

// Javascript Processing
var browserify      = require('browserify'),
    uglify          = require('gulp-uglify');

// Stylesheet Processing
var sass            = require('gulp-sass'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    cssnano         = require('cssnano');

var srcpath      = 'src';
var destpath     = 'dist';

// SCSS processing
gulp.task('style', function() {
	var processors = [
		autoprefixer (
            { browsers :
                [   'last 2 version',
                    'safari 5',
                    'ie 8',
                    'ie 9',
                    'opera 12.1',
                    'ios 6',
                    'android 4'
                ]
            }
        )
	];
    if (!argv.development) {
        processors.push(cssnano);
    }
	return gulp.src(srcpath+'/styles/**/*.scss')
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(gulp.dest(destpath+'/styles/'))
});

// JS processing

// Browserified Scripts
gulp.task('browserifyScript', function() {
    return gulp.src(srcpath + '/scripts/*.bundle.js', function(err,files){
        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(
                    rename(
                        function(fileObj){
                            fileObj.extname = '.min.js';
                            fileObj.dirname = '';
                            fileObj.basename = fileObj.basename.replace('.bundle','');
                        }
                    )
                )
                .pipe(gulp.dest(destpath + '/scripts/'));
            }
        );
        es.merge(tasks);
    });
});

// Non browserified scripts
gulp.task('otherScripts', function() {
    return gulp.src(
            [
                srcpath + '/scripts/**.js',
                '!' + srcpath + '/scripts/*.bundle.js'
            ]
        )
        .pipe(uglify())
        .pipe(
            rename(
                function(fileObj){
                    fileObj.basename = fileObj.basename.replace('.min','');
                    fileObj.extname = '.min.js';
                    fileObj.dirname = '';
                }
            )
        )
        .pipe(gulp.dest(destpath + '/scripts/'))
});

// Task to call both Javascript compilation scripts
gulp.task('script', ['browserifyScript', 'otherScripts']);

gulp.task('files', function() {
	return gulp.src([srcpath+'/**/*', '!'+srcpath+'/styles/**/*', '!'+srcpath+'/scripts/**/*'])
        .pipe(newer(destpath))
		.pipe(gulp.dest(destpath))
});

gulp.task('watch', function() {
	gulp.watch([srcpath+'/**/*', '!'+srcpath+'/styles/**/*', '!'+srcpath+'/scripts/**/*'], ['files']);
	gulp.watch(srcpath +'/scripts/**/*', ['script']);
	gulp.watch(srcpath +'/styles/**/*.scss', ['style']);
});

gulp.task('default', ['style', 'script', 'files']);
