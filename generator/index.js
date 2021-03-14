module.exports = (api, options, rootOptions) => {
    // 通过对话得到结果
    if (options.addExampleRoutes) { // addExampleRoutes 
        // 使用 EJS 渲染 ./template 中的文件 (相对于 generator 中的文件路径进行解析)
        api.render('./template', {
            ...options
        })
    }

    // 修改 package.json
    api.extendPackage({
        dependencies: {
            'vue-i18n': '^8.24.1',
            'vue-plugin-kop': '^0.1.7'
        },
        scripts: {
            greet: 'vue-cli-service greet',
            serve1: 'vue-cli-service serve'
        }
    })
    
    // 修改主文件 (main.js 或 main.ts 文件)
    api.injectImports(api.entryFile, `import VueI18n from 'vue-i18n'`)
    api.injectImports(api.entryFile, `import VuePluginKop from 'vue-plugin-kop'`)
}

// 修改主文件 (main.js 或 main.ts 文件)
module.exports.hooks = api => {
    // 在文件被写入硬盘之后被调用
    api.afterInvoke(() => {
        // EOL 属性是一个常量，返回当前操作系统的换行符（Windows系统是\r\n，其他系统是\n）, 记住, 这个换行符是不可见的, 咱们看到的就是个效果
        const { EOL } = require('os')

        const fs = require('fs')
        const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
        const lines = contentMain.split(/\r?\n/g)

        const newVueIndex = lines.findIndex(line => line.match(/new Vue/))
        lines[newVueIndex - 1] += `${EOL}Vue.use(VuePluginKop)`
        lines[newVueIndex - 1] += `${EOL}Vue.use(VueI18n)`
        lines[newVueIndex - 1] += `${EOL}${EOL}const i18n = new VueI18n({
            // 使用localStorage存储语言状态是为了保证页面刷新之后还是保持原来选择的语言状态
            locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh', // 定义默认语言为中文 
            messages: {
                'zh': require('@/assets/languages/zh.json'),
                'en': require('@/assets/languages/en.json')
            }
        })${EOL}`

        const renderIndex = lines.findIndex(line => line.match(/render/))
        lines[renderIndex - 1] += `${EOL}  i18n,`

        fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' })
    })
}
  