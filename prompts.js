/**
 * 对话
 */

// 将 `package.json` 作为参数传入函数
module.exports = pkg => {
    const prompts = [
        {
            type: 'confirm',
            name: 'addExampleRoutes',
            message: 'Add example routes?',
            validate: input => !!input,
            default: false
        }
    ]
  
    // 添加动态对话
    // if ('@vue/cli-plugin-eslint' in (pkg.devDependencies || {})) {
    //     prompts.push({
    //         type: 'confirm',
    //         name: 'useESLintPluginVueI18n',
    //         message: 'Use ESLint plugin for Vue I18n ?'
    //     })
    // }
  
    return prompts
}