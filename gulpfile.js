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
	gulp.src('src/lib/*.js')
})

gulp.task('js',function(){
  return gulp.src(['js/*.js','js/*.min.js'])
    // .pipe($.uglify())
    // .pipe(gulp.dest('app/js'))
})
gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('less',function(){
  gulp.src('src/less/*.less')
    .pipe($.less())
    .pipe($.autoprefixer({
    	browsers: ['last 4 versions','>5%'],
    	cascade: true,	//是否美化属性值
    	remove: true	//是否去掉不必要的前缀
    }))
    .pipe(gulp.dest('src/css'))
});

gulp.task('css',function(){
	gulp.src('src/css/*.css')
})

gulp.task('serve',['libjs','less','css','js'], function() {
    browserSync.init({
        server: "src",
    });
    gulp.watch("src/lib/*.js",['libjs']);
    gulp.watch("src/less/*.less",['less']);
    gulp.watch("src/css/*.css",['css']).on('change', reload);
    gulp.watch("src/js/*.js",['js']);
    gulp.watch("src/views/*.html").on('change', reload);
});
gulp.task('default', ['serve']);