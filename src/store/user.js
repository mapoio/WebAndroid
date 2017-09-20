import Vue from 'vue'
import Api from '../utils/api'
import router from '../router'
import { log } from '../utils/shortcuts'
// import store from '../store'
// import hello from '../utils/shortcuts'

export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录
let loginApi = Api.login

let accesslocalStorage = items => {
  let states = {}
  items.forEach(item => {
    states[item] = JSON.parse(localStorage.getItem(item)) || {}
  })
  return states
}

let setlocalStorage = items => {
  for (let item in items) {
    localStorage.setItem(item, JSON.stringify(items[item]))
  }
}

let deelExpTime = exp => {
  exp = Date.now() + 3600 * 1000
  return exp
}

export default {

  state: accesslocalStorage(Object.keys(loginApi.response.data)),
  mutations: {
    [USER_SIGNIN] (state, user) {
      Object.assign(state, user)
    },
    [USER_SIGNOUT] (state) {
      localStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  actions: {
    [USER_SIGNIN] ({
      commit
    }, user) {
      Vue.http.post(loginApi.url, loginApi.request).then(success => {
        let data = success.data.data
        data.exp = deelExpTime(data.exp)
        setlocalStorage(data)
        commit(USER_SIGNIN, data)
        router.replace({ path: '/' })
        log.info(log)
      }, failed => {
        commit(USER_SIGNIN, loginApi.response.data)
      })
    },

    [USER_SIGNOUT] ({
      commit
    }) {
      commit(USER_SIGNOUT)
    }
  }
}
