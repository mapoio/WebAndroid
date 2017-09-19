import Vue from 'vue'
import Api from '../utils/api'

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
    if (item !== 'message') {
      localStorage.setItem(item, JSON.stringify(items[item]))
    }
  }
}

export default {
  state: accesslocalStorage([
    'access_token',
    'expires_in',
    'token_type',
    'userName'
  ]),
  // 修复bug 异步请求应该在actions
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
        setlocalStorage(success.data)
        commit(USER_SIGNIN, success.data)
      }, failed => {
        commit(USER_SIGNIN, {
          access_token: '',
          exp: 0,
          token_type: '',
          username: ''
        })
      })
    },
    [USER_SIGNOUT] ({
      commit
    }) {
      commit(USER_SIGNOUT)
    }
  }
}
