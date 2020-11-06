// const urlDns = "https://192.168.2.23";   // 老叶电脑
// const urlDns = "https://192.168.2.113";   // 本地
// const urlDns = "https://jolongnet.cn";    // 阿里云
// const urlDns = 'http://123.207.32.32:8000'   // why 服务器
const urlDns = "http://111.230.225.181:8080";   // 腾讯云


module.exports = {
  configureWebpack: {
    resolve: {
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
    open: false,
    https: false,
    hotOnly: false,
    port: 8081,
    proxy: {
      '/cont': {
        target: urlDns,   // 这样 /control 将会替换成 https://111.230.225.181
        changeOrigin: true,
        ws:true,
        // secure: false,  // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/cont': '/control_app'   // 这种接口配置出来  https://111.230.225.181:8000/control_app/home
        }
      },
      '/hyt': {
        target: urlDns,
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/hyt': ''   // 这种接口配置出来     https://111.230.225.181:8000/home
        }
      },
      '/api': {
        target: 'http://39.97.33.178',
        changeOrigin: true,
        ws:true,
      }
    }
  },
}
