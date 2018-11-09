// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import { getStore } from '@/util'
import moment from 'moment'

Vue.prototype.$moment = moment

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const token = getStore('token')
  if (token || to.path === '/') {
    next()
  } else {
    alert('请先登录')
    next('/')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  beforeCreate: function () {
    console.log('beforeCreated.....')
  }
})
