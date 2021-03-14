/**
 * Service 插件
 */

module.exports = api => {
    // 添加一个新的 cli-service 命令
    api.registerCommand(
        'greet',
        {
            description: 'Writes a greeting to the console',
            usage: 'vue-cli-service greet [options]',
            options: { '--name': 'specifies a name for greeting' }
        },
        args => { // 执行 vue-cli-service greet 命令时会调用的函数
            if (args.name) { // vue-cli-service greet --name 'John Doe'
                console.log(`👋 Hello, ${args.name}!`); // 👋 Hello, John Doe!
            } else {
                console.log(`👋 Hello!`);
            }
        }
    )
    
    // 修改已经存在的 cli-service 命令
    const { serve } = api.service.commands

    const serveFn = serve.fn // fn 是创建这个新命令时传入的第三个参数；它定义了在执行这个命令时要执行的函数

    serve.fn = (...args) => {
        return serveFn(...args).then(res => {
            console.log(`res`, res)
            if(res && res.url) {
                console.log(`Project is running now at ${res.url}`)
            }
        })
    }
}