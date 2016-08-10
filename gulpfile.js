var jsArray = [
    './www/lib/ionic/js/ionic.bundle.js',
    './www/lib/ion-gallery/ion.gallery.min.js',
    './www/lib/js/jquery-1.11.3.min.js',
    './www/lib/jQuery-MD5/jquery.md5.js',
    './www/lib/js/angular-sanitize.js',
    './www/lib/ngstorage/ngStorage.min.js',
    './www/lib/angular-svg-round-progressbar/build/roundProgress.min.js',
    './www/lib/ionic-cache-src/ionic-cache-src.js',
    './www/lib/angular-websql/angular-websql.js',
    'https://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.min.js',
    'http://connect.soundcloud.com/sdk/sdk-3.0.0.js',

    './www/lib/js/jstorage.js',
    './www/lib/js/lodash.min.js',
    './www/lib/js/moment.js',

    './www/js/app.js',
    './www/js/controllers.js',
    './www/js/httpService.js',
    './www/js/services.js',

    //please do not change it
    './w/js/templates.js',
];

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('clean', function() {
    return gulp.src('./w', {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

gulp.task('copy:img', function() {
    var gulpCopy = require('gulp-copy');
    return gulp.src("./www/img/**")
        .pipe(gulpCopy("./w/",{prefix:1}));
});

gulp.task('copy:fonts', function() {
    var gulpCopy = require('gulp-copy');
    return gulp.src("./www/fonts/**")
        .pipe(gulpCopy("./w/",{prefix:1}));
});



gulp.task('minify:css', function() {
  var replace = require('gulp-replace');
  var rename = require('gulp-rename');
  var minifyCss = require('gulp-minify-css');
  return gulp.src('./www/css/*.css')
    .pipe(concat('all.css'))
    .pipe(minifyCss({
      keepSpecialComments: 0,
      rebase: false
    }))
    .pipe(rename('w.css'))
    .pipe(replace('url(../', 'url('))
    .pipe(replace("url('../", "url('"))
    .pipe(replace('url("../', 'url("'))
    .pipe(gulp.dest('./w/css/'));
});

var templateCacheBootstrap = "firstapp.run(['$templateCache', function($templateCache) {";
gulp.task('templatecache', function() {
    var templateCache = require('gulp-angular-templatecache');
    return gulp.src('./www/templates/**/*.html')
        .pipe(templateCache({
            root: "templates/",
            templateHeader: templateCacheBootstrap
        }))
        .pipe(gulp.dest('./w/js/'));
});


gulp.task('concat:js', function() {
    var concat = require('gulp-concat');
    var replace = require('gulp-replace');
    var uglify = require('gulp-uglify');
  var stripDebug = require('gulp-strip-debug');
    return gulp.src(jsArray)
        .pipe(concat('w.js'))
        .pipe(stripDebug())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./w/js/'));
});
gulp.task('minify:indexproduction', function() {
    var rename = require('gulp-rename');
    var opts = {
        conditionals: true,
        spare: true
    };
    var minifyHTML = require('gulp-minify-html');
    return gulp.src('./www/indexproduction.html')
        .pipe(minifyHTML(opts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./w/'));
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


gulp.task('inlinesource', function() {
    var inline = require('gulp-inline');
    return gulp.src('./w/index.html')
        .pipe(inline({
            base: './w',
            disabledTypes: ['svg', 'img'] // Only inline css files
        }))
        .pipe(gulp.dest('./w/'));
});


gulp.task('production', gulpSequence("clean",[ "copy:fonts", "copy:img", "minify:indexproduction", "templatecache"], "concat:js", 'minify:css','inlinesource'));
