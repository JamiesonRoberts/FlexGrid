'use strict';
// Core Gulp
var gulp            = require('gulp'),
    rename          = require('gulp-rename');

// General Plugins
var source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    newer           = require('gulp-newer'),
    es              = require('event-stream');

// Javascript Processing
var browserify      = require('browserify'),
    uglify          = require('gulp-uglify');

// CSS Post Processing
var postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    cssnano         = require('cssnano');

// SASS Processing
var sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps');

// Paths
var srcpath      = 'src';
var destpath     = 'dist';

gulp.task('css', function() {
	var autoprefix = [
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
    var minify = [
        cssnano
    ];
	return gulp.src(srcpath+'/scss/**/*.scss')
        .pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(autoprefix))
        .pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(destpath+'/css/'))
        .pipe(postcss(minify))
        .pipe(
            rename({
                extname: '.min.css',
                dirname: ''
            })
        )
        .pipe(gulp.dest(destpath+'/css/'))
});

gulp.task('script', function() {
    return gulp.src(srcpath + '/javascript/*.bundle.js', function(err,files){
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
                .pipe(gulp.dest(destpath + '/includes/'));
            }
        );
        es.merge(tasks);
    });
});

gulp.task('files', function() {
	return gulp.src([srcpath+'/**/*', '!'+srcpath+'/javascript/**/*'])
        .pipe(newer(destpath))
		.pipe(gulp.dest(destpath))
});

gulp.task('watch', function() {
	gulp.watch([srcpath+'/**/*', '!'+srcpath+'/javascript/**/*.js'], ['files']);
	gulp.watch(srcpath +'/javascript/**/*.js', ['script']);
	gulp.watch(srcpath +'/scss/**/*.scss', ['css']);
});

gulp.task('default', ['css', 'script', 'files']);
