// 接口公共文件
// 示例配置如下
// login: {
// url: 'http://127.0.0.1:8080/api/v1/login',
// description: '登录',
// version: '1.0',
// methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
// request: {username: 'username', password: 'password123'},
// response: {message: 'success login', status: '1', data: {token: 'JKIGFJKFF984654VFFDFG3216', exp: '1504932618'}}
// }
// http://easy-mock.com/mock/59b39867e0dc663341a34043/webandroid/login
let DevHost = 'http://easy-mock.com/mock/59b39867e0dc663341a34043/webandroid' // 开发地址，优先级最低
let TestHost = '' // 后台联调地址，优先级中等
let ProductionHost = '' // 生产环境地址，优先级别最高

let Host = ProductionHost !== '' ? ProductionHost : (TestHost !== '' ? TestHost : DevHost)

export default {
  login: {
    url: Host + '/Account/Login',
    description: '登录',
    version: '1.0',
    methods: ['POST'],
    request: {
      username: 'admin',
      password: 'admin'
    },
    response: {
      code: 20,
      message: 'success',
      data: {
        access_token: '',
        exp: 3600,
        token_type: 'Basic',
        username: ''
      }
    }
  },
  register: {
    url: Host + '/Account/Register',
    description: '注册',
    version: '1.0',
    methods: ['POST'],
    request: {
      username: 'admin',
      password: 'admin'
    },
    response: {
      code: 21,
      message: 'success',
      data: {}
    }
  }
}
