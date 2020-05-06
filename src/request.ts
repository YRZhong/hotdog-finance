import { extend } from 'umi-request'

const request = extend({
  prefix: '/api',
  timeout: 1000,
  headers: {
    app_id: 'wp1skkgho3ptkn3m',
    app_secret: 'MnpweklDc2l3cE9vQUtpWm0zZHhoUT09'
  }
})

export default request
