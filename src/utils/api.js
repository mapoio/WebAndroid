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
let DevHost = '127.0.0.1'

let Host = 'http://' + DevHost + '/api/v1/login'

export default {
  login: {
    url: Host,
    description: '登录',
    version: '1.0',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    request: {username: 'username', password: 'password123'},
    response: {message: 'success login', status: '1', data: {token: 'JKIGFJKFF984654VFFDFG3216', exp: '1504932618'}}
  }
}
