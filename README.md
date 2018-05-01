# Multi-Gulp
FXXX Project

### 项目说明

> 项目以企业站居多，前后端未完全分离，二次开发基本上都是从服务器上拉取的代码。

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

```


### Todo

- [x] 图片压缩
- [ ] 字体压缩
- [ ] iconfont
- [x] css sprite
- [ ] 路由控制
- [ ] 合并文件
- [x] 模板页面
- [x] ejs转换成html
- [x] css添加前缀
- [x] html格式化
- [x] 控制开发模式


### 任务状态
|任务|状态|
|:-:|:-:|
|创建PC端模板|开放，测试，执行命令 `gulp createPC`|
|创建WAP端模板|未开放，未测试，执行命令 `gulp createWAP`|
|html压缩|未开放|
|图片压缩|开放，未测试|
|雪碧图|开放，未测试，执行命令 `gulp sprite`|
|图片打包|已经测试|
|字体打包|未测试|
|项目打包|测试，执行命令 `gulp build`|