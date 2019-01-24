/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * test
 */

let apiUrl

switch (process.env.NODE_ENV) {
  case 'development':
    // apiUrl = 'http://39.104.229.106:8081/api'
    // apiUrl = 'http://0.0.0.1:8081'
    // apiUrl = 'http://192.168.31.8:8081/api'
    // apiUrl = 'http://192.168.31.8:8081/api'
    apiUrl = 'http://localhost:8081/api'
    // apiUrl = 'http://www.phptrain.cn'
    // apiUrl = 'http://www.phptrain.cn'
    break
  case 'production':
    // apiUrl = 'http://45.40.243.125:8011'
    // apiUrl = 'http://47.75.198.92:8011'
    apiUrl = 'http://sc.truescan.net/admin'
    // apiUrl = 'http://test.phptrain.cn/admin'
    break
  case 'test':
    apiUrl = 'http://test.truescan.net/admin'
    break
}

export {
  apiUrl
}
