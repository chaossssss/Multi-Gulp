var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config/config.js');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var replacePath = '/jijuwang';

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

gulp.task('createPC',function(done){
	config.pages.forEach(function(page){
		gulp.src('config/template/pc_template.ejs')
			.pipe($.rename(page + '.ejs'))
			.pipe(gulp.dest(config.rootPath + 'ejs'))
	})
	gulp.src('config/template/header.ejs')
		.pipe(gulp.dest(config.rootPath + 'ejs'))
	gulp.src('config/template/footer.ejs')
		.pipe(gulp.dest(config.rootPath + 'ejs'))
	done()
})

gulp.task('createWAP',function(done){
	config.pages.forEach(function(page){
		gulp.src('config/template/wap_template.ejs')
			.pipe($.rename(page + '.ejs'))
			.pipe(gulp.dest(config.rootPath + 'ejs'))
	})
	gulp.src('config/template/header.ejs')
		.pipe(gulp.dest(config.rootPath + 'ejs'))
	gulp.src('config/template/footer.ejs')
		.pipe(gulp.dest(config.rootPath + 'ejs'))
	done()
})

gulp.task('libjs',function(done) {
	gulp.src('src/lib/*.js')
	done()
})

gulp.task('ejs',function(done){
	gulp.src('src/ejs/*.ejs')
		.pipe($.ejs({mode:'dev'},{}, { ext: '.html'}))
		.pipe($.htmlBeautify(htmlbeautifyOptions))
		.pipe(gulp.dest('src'))
	done()
})

gulp.task('js',function(){
	return new Promise(function(resolve, reject){
		gulp.src(['src/js/*.js','src/js/*.min.js'])
    	// .pipe($.uglify())
    	.pipe(gulp.dest('dist/js'))
	    resolve()
	})
})
gulp.task('js-watch',gulp.series('js', browserSync.reload));

gulp.task('less',function(done){
  gulp.src('src/less/*.less')
    .pipe($.autoprefixer({
    	browsers: ['last 4 versions','>5%'],
    	cascade: true,	//是否美化属性值
    	remove: true	//是否去掉不必要的前缀
    }))    
    .pipe($.sourcemaps.init())
    .pipe($.less({compress:false}))	//要压缩改成true
    .pipe($.sourcemaps.write("./"))
    // .pipe($.cleanCss({compatibility: 'ie8'}))	//压缩css
    .pipe(gulp.dest('src/css'))
  done()
});

gulp.task('sourcemapCss',function(done){
	gulp.src('src/css/*.css')
		.pipe(gulp.dest('dist/css'))
	done()
})

gulp.task('serve',gulp.series('libjs','ejs','less','sourcemapCss','js', function() {
    browserSync.init({
        server: "src",
        // port: 8081
    });
    gulp.watch("src/lib/*.js",gulp.series('libjs'));
    gulp.watch("src/ejs/*.ejs",gulp.series('ejs')).on('change',reload);
    // gulp.watch("src/less/*.less",['less']);
    gulp.watch("src/less/*.less",function(){
    	$.multiProcess(['less'],function(){})
    });
    gulp.watch("src/css/*.css",gulp.series('sourcemapCss')).on('change', reload);
    gulp.watch("src/js/*.js",gulp.series('js'));
    gulp.watch("src/*.html").on('change', reload);
}));
gulp.task('default',gulp.series('serve'));

//打包相关任务
gulp.task('replace',function(done){
	gulp.src('src/ejs/*.ejs')
	.pipe($.ejs({mode:'prod'},{}, { ext: '.cshtml'}))
	// .pipe($.htmlmin(htmlminOptions))
	.pipe($.htmlBeautify(htmlbeautifyOptions))
	.pipe(gulp.dest('dist/views'))
	done()
})
// 静态页面导入到static
gulp.task('toStatic',function(done){
	gulp.src('src/ejs/*.ejs')
	.pipe($.ejs({mode:'mode'},{}, {ext: '.html'}))
	.pipe($.replace('/images/',replacePath + '/images/'))
	.pipe($.replace('/js/',replacePath + '/js/'))
	.pipe($.replace('/css/',replacePath + '/css/'))
	.pipe($.htmlBeautify(htmlbeautifyOptions))
	.pipe(gulp.dest('dist/static'))
	done()
})



gulp.task('reCssImgPath',function(done){
	gulp.src('src/css/*.css')
		.pipe($.replace('/images/',replacePath + '/images/'))
		.pipe($.replace('/fonts/',replacePath + '/fonts/'))
		.pipe(gulp.dest('dist/reCss'))
	done()
})

gulp.task('image',function(done){
	gulp.src('src/images/*.*')
		.pipe($.imagemin({imageminOptions}))
		.pipe(gulp.dest('dist/images'))
	done()
})

gulp.task('font',function(done){
	gulp.src('src/fonts/*.*')
		.pipe(gulp.dest('dist/fonts'))
	done()
})

gulp.task('css',function(done){
  gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'))
  gulp.src('src/less/*.less')
    .pipe($.autoprefixer({
    	browsers: ['last 4 versions','>5%'],
    	cascade: true,	//是否美化属性值
    	remove: true	//是否去掉不必要的前缀
    }))    
    .pipe($.less({}))
    // .pipe($.cleanCss({compatibility: 'ie8'}))	//压缩css
    .pipe(gulp.dest('dist/css'))
  done()
});



gulp.task('build',gulp.series('replace','image','font','css'))
//替换路径指令
gulp.task('rePath',gulp.series('toStatic','reCssImgPath'));

//雪碧图
gulp.task('sprite',function (done) {
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
    done()
});