// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'
import VueResource from 'vue-resource'
import 'vue-ydui/dist/ydui.rem.css'
import store from './store'

Vue.config.productionTip = false

Vue.use(YDUI)
Vue.use(VueResource)
/* eslint-disable no-new */

// 每次请求都将检查登录状态
router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta
  // var isLogin = Boolean(store.state.user.expires_in) // true用户已登录， false用户未登录
  let timeleft = Date.now() - store.state.user.exp
  var isLogin = Boolean(timeleft < 0)
  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})

Vue.http.headers.common['Authorization'] = store.state.user.exp + ' ' + store.state.user.access_token

// 请求后检查异常处理，不同的异常进行不同的操作
// Vue.http.interceptors.push

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
