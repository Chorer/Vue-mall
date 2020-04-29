const path=require('path')
 // resolve定义一个绝对路径获取函数
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  },
  chainWebpack(config){
    //排除icons目录中svg文件处理
    config.module.rule('svg')
    .exclude.add(resolve('src/assets/img/icons'))
    .end()
    //设置svg-sprite-loader处理icons目录中的svg
    config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/assets/img/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader("svg-sprite-loader")
    .options({symbolId:'icon-[name]'})
    .end()
  }
}