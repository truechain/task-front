
/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * test
 */

let apiUrl

switch (process.env.NODE_ENV) {
  case 'development':
    apiUrl = 'http://127.0.0.1:8083'
    break
  case 'production':
    apiUrl = 'http://www.phptrain.cn/api/'
    break
}

export {
  apiUrl
}
