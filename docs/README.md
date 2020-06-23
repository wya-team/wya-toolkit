<p align="center"><image src="https://avatars1.githubusercontent.com/u/34465004?s=400&u=25c4b1279b2f092b368102edac8b7b54dc708d00&v=4" width="128"></p>

# @wya/toolkit
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/@wya/toolkit.svg
[npm-url]: https://www.npmjs.com/package/@wya/toolkit

**@wya/toolkit** 是指令集

## 安装
``` shell
$ npm install @wya/toolkit --save
```

## 示例

```shell
$ wya server
$ wya screen
$ wya init
$ wya lint
$ ...
```

## 设置开发环境
克隆仓库之后，运行：

```shell
$ yarn install # 是的，推荐使用 yarn。 :)
```

```shell
# 监听并自动重新构建
$ npm run dev

# 单元测试
$ npm run test

# 构建所有发布文件
$ npm run build
```

## 项目结构
+ **`assets`**: logo 文件。
+ **`config`**: 包含所有和构建过程相关的配置文件。
+ **`docs`**: 项目主页及文档。
+ **`lib`**: 包含用来发布的文件，执行 `npm run lib` 脚本后，这个目录不会被上传。
+ **`tests`**: 包含所有的测试，单元测试使用
+ **`src`**: 源代码目录。
+ **`demo`**: 在线运行的例子。
+ **`examples`**: 在线运行的源代码。

## 指令

---

### `server` 

`wya server`

随启随用的静态文件服务器

---

### `screen` 

`wya screen`

屏幕共享（使用截图）

---

### `init` 

`wya init`

初始化下载`wya`脚手架或者其他仓库

---

### `lint` 

`wya lint --mode commit`

lint工具

---


### `live` 

`wya live`

TODO: 实时共享

---


## 开源许可类型
MIT

## FAQ
Q: ？  
A: 。


