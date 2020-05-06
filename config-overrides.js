const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer
} = require('customize-cra')
const path = require('path')
const resolve = (dir) => path.join(__dirname, '.', dir)

// 跨域配置
const devServerConfig = () => (config) => {
  return {
    ...config,
    compress: true,
    proxy: {
      '/api': {
        target: 'https://www.mxnzp.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': resolve('src')
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1890ff' }
    })
  ),
  devServer: overrideDevServer(devServerConfig())
}
