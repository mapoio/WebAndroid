import Vue from 'vue'
import Api from '../utils/api'
import { log } from '../utils/shortcuts'

export const USER_REGISTER = 'USER_REGISTER' // 注册成功
export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录
let loginApi = Api.login
let registerApi = Api.register

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
    [USER_SIGNOUT] (state, user) {
      // localStorage.removeItem('user')
      // Object.keys(state).forEach(k => Vue.delete(state, k))
      Object.assign(state, user)
    }
  },
  actions: {
    [USER_SIGNIN] ({
      commit
    }, user) {
      let post = Vue.http.post(loginApi.url, loginApi.request).then(success => {
        let data = success.data.data
        data.exp = deelExpTime(data.exp)
        setlocalStorage(data)
        commit(USER_SIGNIN, data)
      }, failed => {
        commit(USER_SIGNIN, loginApi.response.data)
        throw new Error('请求失败，请检查API接口或者网络状态')
      })
      return post
    },

    [USER_SIGNOUT] ({
      commit
    }) {
      let data = loginApi.response.data
      setlocalStorage(data)
      commit(USER_SIGNOUT, data)
      return Promise.resolve()
    },
    [USER_REGISTER] ({
      commit
    }, user) {
      Vue.http.post(registerApi.url, registerApi.request).then(success => {
        log.log('ty') // TODO: 用promise返回状态
        // alert('注册成功！')
      })
    }
  }
}
