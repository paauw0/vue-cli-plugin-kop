# vue-cli-plugin-kop

## generator/index.js
```
api.extendPackage : 向项目中添加额外的依赖，创建一个 npm 脚本或者修改 package.json 的其他任何一处
api.render : 负责将模板项目中提前定义好的目录和文件拷贝到初始化的项目中
api.entryFile 将返回项目的主文件（main.js 或 main.ts）
api.injectImports 用于添加新的导入到主文件中
api.afterInvoke 这个钩子将在文件被写入硬盘之后被调用
api.chainWebpack 这个 API 允许 service 插件针对不同的环境扩展/修改内部的 webpack 配置
```

## index.js
```
api.registerCommand 通过 service 插件你可以注册一个新的 cli-service 命令，除了标准的命令（即 serve 和 build）
api.service.commands 获取到命令对象 (如果你想修改一个已经存在的 cli-service 命令，你可以使用 api.service.commands 获取到命令对象并且做些改变)
```

## prompts.js
```
当用户通过调用 vue invoke 初始化插件时，如果插件根目录包含 prompts.js，他将在调用时被使用
这个文件应该导出一个问题数组 -- 将被 Inquirer.js 处理
导出一个问题数组，或者导出一个返回这些内容的函数
解析到的答案对象将作为选项传入到插件的 generator
用户可以通过在命令行传入选项跳过对话直接初始化插件 (vue invoke my-plugin --mode awesome)
对话可以有不同的类型，但是在 CLI 大多数使用的是 checkbox 和 confirm
```

