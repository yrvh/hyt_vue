module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        '%': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}