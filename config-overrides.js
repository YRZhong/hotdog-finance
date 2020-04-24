const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

module.exports = override(
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
)
