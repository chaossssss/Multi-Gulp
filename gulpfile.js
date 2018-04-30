var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config/config.js');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var htmlbeautifyOptions = {
	indent_size: 4,
	indent_char: ' ',
	//可以让一个标签独占一行
	unformatted: true,
	// 默认情况下，body | head 标签前会有一行空格
	extra_liners: []
};

gulp.task('createPC',function(){
	config.pages.forEach(function(page){
		gulp.src('config/template/pc_template.ejs')
			.pipe($.rename(page + '.ejs'))
			.pipe(gulp.dest(config.rootPath + 'ejs'))
	})
	gulp.src('config/template/header.ejs')
		.pipe(gulp.dest(config.rootPath + 'ejs'))
	gulp.src('config/template/footer.ejs')
		.pipe(gulp.dest(config.rootPath + 'ejs'))
})

gulp.task('libjs',function() {
	gulp.src('src/lib/*.js')
})

gulp.task('ejs',function(){
	gulp.src('src/ejs/*.ejs')
		.pipe($.ejs({},{}, { ext: '.html'}))
		.pipe($.htmlBeautify(htmlbeautifyOptions))
		.pipe(gulp.dest('src'))
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

gulp.task('serve',['libjs','ejs','less','css','js'], function() {
    browserSync.init({
        server: "src",
    });
    gulp.watch("src/lib/*.js",['libjs']);
    gulp.watch("src/ejs/*.ejs",['ejs']).on('change',reload);
    gulp.watch("src/less/*.less",['less']);
    gulp.watch("src/css/*.css",['css']).on('change', reload);
    gulp.watch("src/js/*.js",['js']);
    gulp.watch("src/*.html").on('change', reload);
});
gulp.task('default', ['serve']);