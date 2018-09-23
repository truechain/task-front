// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import axios from "axios"
import "./assets/css/reset.css"
import './assets/css/iconfont.css'
import './assets/css/border.css'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: './assets/img/task-logo.png'
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// 请求拦截
axios.interceptors.request.use(
	config => {
		let token = localStorage.getItem("token");
		token = JSON.parse(token)
		if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Token = `${token.token}`;
			config.headers.Agent = `${token.agent}`;
		}
		// if (config.url.indexOf(url) === -1) {
		// 	config.url = url + config.url;/*拼接完整请求路径*/
		// }
		return config;
	},
	err => {
		return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
			// token 已过期，重定向到登录页面
			if (response.data.code == 403){
				localStorage.clear()
				router.replace({
						path: '/login'
				})
			} else if (response.data.code == 500) {
        if (response.data.message.includes('不存在')) {
          localStorage.clear()
          router.replace({
              path: '/login'
          })
        }
      }
			return response
		}, function (error) {
			// Do something with response error
			return Promise.reject(error)
})

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
