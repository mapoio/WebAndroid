import Vue from 'vue'
import Api from '../utils/api'

export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录
let loginApi = Api.login

export default {
  state: JSON.parse(sessionStorage.getItem('user')) || {},
  // {
  //   domain: 'http://test.example.com',
  //   userInfo: {
  //     nick: null,
  //     ulevel: null,
  //     uid: null,
  //     portrait: null
  //  }
  mutations: {
    [USER_SIGNIN] (state, user) {
      this.$http.get(loginApi)
      sessionStorage.setItem('user', JSON.stringify(user))
      Object.assign(state, user)
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
