//使用rem布局
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    lintOnSave:false,
    //部署应用包时的基本 URL
    publicPath:'./',
    // 输出文件目录
    outputDir: 'dist',
    //使用rem布局
    css:{
      modules:false,
      extract:true,
      sourceMap:false,
      loaderOptions: {
        postcss: {
          plugins: [
            autoprefixer(),
            pxtorem({
              rootValue: 37.5,
              propList: ['*']
            })
          ]
        }
      }
    },
    
}
