var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config/config.js');
var spritesmith = require('gulp.spritesmith');
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
var htmlminOptions = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	minfyJS: false,//压缩JS
	minfyCss: false,//压缩CSS
};
var imageminOptions = {
	optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
	progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
	interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
	multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
}

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

gulp.task('createWAP',function(){
	config.pages.forEach(function(page){
		gulp.src('config/template/wap_template.ejs')
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
		.pipe($.ejs({mode:'dev'},{}, { ext: '.html'}))
		.pipe($.htmlBeautify(htmlbeautifyOptions))
		.pipe(gulp.dest('src'))
})

gulp.task('js',function(){
  return gulp.src(['src/js/*.js','src/js/*.min.js'])
    // .pipe($.uglify())
    .pipe(gulp.dest('dist/js'))
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
		.pipe(gulp.dest('dist/css'))
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

//打包相关任务
gulp.task('replace',function(){
	gulp.src('src/ejs/*.ejs')
	.pipe($.ejs({mode:'prod'},{}, { ext: '.cshtml'}))
	// .pipe($.htmlmin(htmlminOptions))
	.pipe($.htmlBeautify(htmlbeautifyOptions))
	.pipe(gulp.dest('dist/views'))
})

gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe($.imagemin({imageminOptions}))
		.pipe(gulp.dest('dist/images'))
})

gulp.task('font',function(){
	gulp.src('src/fonts/*.*')
		.pipe(gulp.dest('dist/fonts'))
})

gulp.task('build',['replace','image','font'])
//雪碧图
gulp.task('sprite', function () {
    return gulp.src('src/sprite/images/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'src/sprite/sprite.png',//保存合并后图片的地址
            cssName: 'src/sprite/css/sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate: function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url('"+sprite.escaped_image+"');"+
                    "background-position: "+sprite.px.offset_x+"px "+sprite.px.offset_y+"px;"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}\n");
                });
                return arr.join("");
            }
        }))
});