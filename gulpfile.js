var browserify = require('browserify');
var browserSync  = require('browser-sync');
var reload      = browserSync.reload;
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var server = require('./server');
var config = require('./config')
var pm2 = require('pm2');

gulp.task('js', function() {
      return  browserify('./public/app.js')
    	//parse the jsx to js
        .transform(reactify)
        // bundle all the dependency files as one
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('app.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/js/'))
        //reload browser 
        .pipe(reload({stream: true}));
});


gulp.task('less', function() {
   return gulp.src('./public/src/style.less')
    .pipe(less())
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('fonts', function() {
   return gulp.src('./node_modules/bootstrap/fonts/*')
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('clean', function() {
    return del.sync(['./build/**']);
});

gulp.task('html',function() {
    return gulp.src('./public/index.html')
      .pipe(gulp.dest('./build/'))
      .pipe(reload({stream: true}));
});

//server side rendering task
gulp.task('default',function () { 
   runSequence('clean',['js'],'less','fonts','browser-sync');
   gulp.watch('./public/**/*.js',['js']);
   gulp.watch('./public/**/*.less',['less']); 
   gulp.watch('./public/index.html',['html']);
});
//client side rendering task
gulp.task('client',function () { 
   runSequence('clean',['js'],'less','fonts','html','browser-sync');
   gulp.watch('./public/**/*.js',['js']);
   gulp.watch('./public/**/*.less',['less']); 
   gulp.watch('./public/index.html',['html']);
});
//run server indefinitely task
gulp.task('build',function () { 
   runSequence('clean',['js'],'less','fonts','pm2');
   gulp.watch('./public/**/*.js',['js']);
   gulp.watch('./public/**/*.less',['less']); 
});



gulp.task('pm2',function() {
    pm2.connect(function(){
    pm2.start("server.js","server");
  });
});


// Rerun the task when a file changes
gulp.task('browser-sync', function() {
 browserSync({
    proxy: config.HOSTNAME + ":" + config.PORT,
    ghostMode: false
  });
  
});



