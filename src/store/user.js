// import Vue from 'vue'
// // import Api from '../utils/api'
import Api from '../api'
// import { log } from '../utils/shortcuts'
import { Base64 } from 'js-base64'

export const USER_REGISTER = 'USER_REGISTER' // 注册成功
export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录

let Register = Api.user.Register
let Login = Api.user.Login

let base2obj = base => {
  return JSON.parse(Base64.decode(base))
}

export default {
  state: Login.storage,
  mutations: {
    [USER_SIGNIN] (state, user) {
      Object.assign(state, user)
      Login.commonHeaders = {key: 'Staffid', value: user.username}
      console.log(Login.commonHeaders)
    },
    [USER_SIGNOUT] (state, user) {
      Object.assign(state, user)
    }
  },
  actions: {
    [USER_SIGNIN] ({
      commit
    }, user) {
      Login.data = user
      console.log(Login)
      let post = Login.send().then(success => {
        if (success.data.success === false) {
          throw new Error(success.data.message)
        }
        let data1 = base2obj(success.data.data.access_token.split('.')[1])
        data1.token_type = base2obj(success.data.data.access_token.split('.')[0]).typ
        data1.access_token = success.data.data.access_token
        console.log(Login)
        Login.storage = data1
        commit(USER_SIGNIN, data1)
      }, failed => {
        Login.removeStorage()
        if (failed.status === 404) {
          throw new Error('登录接口错误或者网络连接不正确')
        }
        console.log(failed)
        throw new Error('未知错误')
      })
      return post
    },

    [USER_SIGNOUT] ({
      commit
    }) {
      let data = {}
      Login.removeStorage()
      commit(USER_SIGNOUT, data)
      return Promise.resolve()
    },
    [USER_REGISTER] ({
      commit
    }, user) {
      Register.data = user
      let post = Register.send().then(success => {
        if (success.data.success === false) {
          throw new Error(success.data.message)
        }
        let data1 = base2obj(success.data.data.access_token.split('.')[1])
        data1.token_type = base2obj(success.data.data.access_token.split('.')[0]).typ
        data1.access_token = success.data.data.access_token
        console.log(data1)
        Register.storage = data1
        console.log(Register)
        commit(USER_SIGNIN, data1)
      }, failed => {
        Register.removeStorage()
        if (failed.status === 404) {
          throw new Error('注册接口错误或者网络连接不正确')
        }
        console.log(failed)
        throw new Error('未知错误')
      })
      return post
    }
  }
}
