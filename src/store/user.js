import Vue from 'vue'
import Api from '../utils/api'
// import store from '../store'
// import hello from '../utils/shortcuts'

export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录
let loginApi = Api.login

let accesslocalStorage = items => {
  let states = {}
  // for (let item in items) {
  //   states.item = JSON.parse(localStorage.getItem(item)) || {}
  // }
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

export default {
  // state: JSON.parse(localStorage.getItem('user')) || {},
  state: accesslocalStorage([
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
        // console.log(success.data)
        commit(USER_SIGNIN, success.data)
      }, failed => {
        // state['expires_in'] = 0
        commit(USER_SIGNIN, {
          access_token: '',
          expires_in: '0',
          token_type: '',
          userName: ''
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
