// const urlDns = "http://192.168.2.23:8080";   // 老叶电脑
// const urlDns = "https://192.168.2.113";   // 本地
// const urlDns = "https://jolongnet.cn";    // 阿里云
// const urlDns = 'http://123.207.32.32:8000'   // why 服务器
const urlDns = "http://111.230.225.181:8080"   // 腾讯云
const downFile = 'http://hyt-1300351459.cos.ap-guangzhou.myqcloud.com'   //下载文件的路径


module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  indexPath: 'index.html',
  filenameHashing: true,   // 文件名哈希
  runtimeCompiler: false,   // 是否包含运行时编译器vue构建版本
  transpileDependencies: [],   // 转译某一个依赖
  productionSourceMap: false,

  configureWebpack: {
    externals: {   // 此处可以配置一些cdn资源
    },

    resolve: {   // 配置别名
      alias: {   // 解决别名的问题
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'store': '@/store',
        'views': '@/views'
      }
    }
  },
  // 反向代理:   解决访问数据的问题
  devServer: {
    publicPath: process.env.NODE_ENV === 'production'? '/hyt20/' : '/',
    open: false,
    https: false,
    hotOnly: false,
    port: 8081,
    proxy: {
      '/cont': {   // 业务阶段
        target: urlDns,   // 这样 /control 将会替换成 https://111.230.225.181
        changeOrigin: true,
        ws:true,
        // secure: false,  // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/cont': '/control_app'   // 这种接口配置出来  https://111.230.225.181:8000/control_app/home
        }
      },

      '/hyt': {   // 注册阶段
        target: urlDns,
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/hyt': ''   // 这种接口配置出来     https://111.230.225.181:8000/home
        }
      },

      // '/sdata': {   // 共享接口(过滤条件)
      //   target: urlDns,
      //   changeOrigin: true,
      //   ws:true,
      //   pathRewrite: {
      //     '^/sdata': '/share/ms/getUserData'
      //   }
      // },
      '/sapp': {   // 风控相关接口
        target: urlDns,
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/sapp': '/share_app/ms'
        }
      },

      '/down': {
        target: downFile,
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/down': ''  
        }
      },
    }
  },
  chainWebpack(config) {
    
  }
}
