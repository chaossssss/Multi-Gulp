var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config/config.js');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('createPC',function(){
	config.pages.forEach(function(page){
		gulp.src('config/template/pc_template.html')
			.pipe($.rename(page + '.html'))
			.pipe(gulp.dest(config.rootPath + 'views'))
	})
	gulp.src('config/template/header.ejs')
		.pipe(gulp.dest(config.rootPath + 'views'))
	gulp.src('config/template/footer.ejs')
		.pipe(gulp.dest(config.rootPath + 'views'))
})
gulp.task('libjs',function() {
	return gulp.src('src/lib/*.js')
		// .pipe(browserify())
})
gulp.task('lib-watch',['libjs'],browserSync.reload)
gulp.task('serve',['libjs'], function() {
    browserSync.init({
        server: "src",
    });
    gulp.watch("src/lib/*.js",['lib-watch']);
    gulp.watch("src/views/*.html").on('change', reload);
});
gulp.task('default', ['serve']);