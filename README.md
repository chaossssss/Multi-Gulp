# Multi-Gulp
:kissing_heart:FXXX Project:neckbeard:

### 项目说明

> 项目以企业站居多，前后端未完全分离，二次开发基本上都是从服务器上拉取的代码。

---

### 项目使用注意点

* 项目安装`npm install`，安装yarn的用户`yarn install`
* 安装完成可以执行命令 `gulp createPC`或者`gulp createWAP`，自己创建文件也是可以的
* 项目启动`gulp`
* 在ejs文件夹创建文件，然后在src中生成对应的HTML文件，主要是为了少一层结构
* 在less文件夹创建文件，然后在src/css中生成对应的css文件，初始化样式文件可以直接扔在css中也可以改成less。ejs文件引用直接是引用css文件夹下的文件
* dist文件夹为打包文件。打包主要是监听css、js、ejs，然后直接把images和fonts文件夹的文件导入到dist文件夹中
* 雪碧图把要处理的图片放到sprite/images文件夹下
* 安装了bower，通过bower安装的库设置在了lib文件夹下，意义不大，主要是为了查库的版本
* github上传空文件夹不是特别好，请参照项目结构自行补足

### 项目结构

```
project
│───config
│	│───template
│───dist
└───src
    │───css
    │───ejs
    │───fonts
    │───images
    │───js
    │───less
    │───lib
    │───sprite
    │	│───images
    │	│───css

```


### Todo

- [x] 图片压缩
- [ ] 字体压缩
- [ ] iconfont
- [x] css sprite
- [ ] ~~路由控制~~
- [ ] css压缩
- [ ] js压缩
- [x] 端口
- [x] 修复引用less文件的问题
- [ ] 合并文件
- [ ] css Modules
- [ ] ~~json~~
- [x] 模板页面
- [x] bower
- [x] ejs转换成html
- [x] css添加前缀
- [x] html格式化
- [x] 控制开发模式


### 任务状态
|任务|状态|
|:-:|:-:|
|创建PC端模板|开放，已测试，执行命令 `gulp createPC`|
|创建WAP端模板|开放，未测试，执行命令 `gulp createWAP`|
|html压缩|未开放|
|css压缩|未开放，已测试，gulpfile 79行|
|图片压缩|开放，未测试|
|雪碧图|开放，未测试，执行命令 `gulp sprite`|
|图片打包|已测试|
|字体打包|未测试|
|项目打包|已测试，执行命令 `gulp build`|
|端口|已测试，目前默认，在port中自行修改|