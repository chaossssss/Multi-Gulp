module.exports = {
	rootPath:'src/',//指定当前要开发的网站，必须
	pages:[
		'index',
		'about',
		'join',
	],//指定当前开发网站所需要的网页，方便自动化，不是必须
	//上下2种写法都可以
	env:{
		//指定当前开发模式
		mode:JSON.stringify("production"),
		// mode:JSON.stringify("development"),
	},
	// sourceMap:true,
	sourceMap:false,
}