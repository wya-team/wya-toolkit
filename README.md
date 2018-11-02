# wya-toolkit
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]
- 安装
```vim
npm i wya-toolkit -g
```

- 本地调试的时候，在根目录下执行
```vim
" 1
npm link

" 2
node ./bin/wya
```
### 如何设计

- 学习使用`commander`
- 参考`__tpl__`指令以及模版，如执行`wya __tpl__ test -t test`

## 功能
#### 为更好的提示，参数提示用户输入，避免`-a -b --test ./`类似传参数的方式)

- `wya server`: 随启随用的静态文件服务器
- `wya screen`: 屏幕共享（使用截图）
- `wya init`: 初始化下载`wya`脚手架或者其他仓库
- `wya add`: 新建`wya`脚手架路由规则下，自动创建文件(待开发：`AST`)

## 待开发

- `wya delete`: 对应add的删除
- `wya live`: 直播（屏幕共享的增强，录屏缓冲直播流）
- `wya live ....`
- ...

## 待处理问题

- 多台设备流量太大，如何控制（屏幕共享和直播流多台设备连接时输出的流量大，延迟会很大）


<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/wya-toolkit.svg
[npm-url]: https://www.npmjs.com/package/wya-toolkit
