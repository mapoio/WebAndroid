import Vue from 'vue'
import Api from '../utils/api'

export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录
let loginApi = Api.login

let accessSessionStorage = items => {
  let states = {}
  // for (let item in items) {
  //   states.item = JSON.parse(sessionStorage.getItem(item)) || {}
  // }
  items.forEach(item => {
    states[item] = JSON.parse(sessionStorage.getItem(item)) || {}
  })
  return states
}

let setSessionStorage = items => {
  for (let item in items) {
    sessionStorage.setItem(item, JSON.stringify(items[item]))
  }
}

export default {
  // state: JSON.parse(sessionStorage.getItem('user')) || {},
  state: accessSessionStorage([
    'access_token',
    'expires_in',
    'token_type',
    'userName'
  ]),
  // {
  //   domain: 'http://test.example.com',
  //   userInfo: {
  //     nick: null,
  //     ulevel: null,
  //     uid: null,
  //     portrait: null
  //  }
  // TODO: 添加用户登录，获取access_token
  mutations: {
    [USER_SIGNIN] (state, user) {
      this._devtoolHook.Vue.http.post(loginApi.url, loginApi.request).then(success => {
        // sessionStorage.setItem('user', JSON.stringify(user))
        setSessionStorage(success.data)
        Object.assign(state, user)
        console.info(state)
      }, failed => {
        state['expires_in'] = 0
      })
      console.info('login: ' + state)
    },
    [USER_SIGNOUT] (state) {
      sessionStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  actions: {
    [USER_SIGNIN] ({
      commit
    }, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT] ({
      commit
    }) {
      commit(USER_SIGNOUT)
    }
  }
}
