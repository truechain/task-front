// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// 引入element-ui的默认CSS样式
import 'element-ui/lib/theme-default/index.css'

import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 请求拦截
axios.interceptors.request.use(
	config => {
  let token = localStorage.getItem('token')
		// token = JSON.parse(token)
  if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Token = `${token.token}`
    config.headers.Agent = `${token.agent}`
  }
		// if (config.url.indexOf(url) === -1) {
		// 	config.url = url + config.url;/*拼接完整请求路径*/
		// }
  return config
},
	err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
			// token 已过期，重定向到登录页面
  if (response.data.code == 403) {
    localStorage.clear()
    router.replace({
      path: '/login'
    })
  }
  return response
}, function (error) {
			// Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  beforeCreate: function () {
    console.log('beforeCreated.....')
  }
})
