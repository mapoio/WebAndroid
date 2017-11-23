import API from './config'

const Host = API.Host
const ApiDataWithAuth = API.ApiDataWithAuth

export const Login = new ApiDataWithAuth({
  url: Host + '/api/token',
  description: '登陆',
  version: '1.0',
  request: {
    url: Host + '/api/token',
    method: 'POST',
    data: {
      username: '测试',
      password: '1'
    }
  },
  storage_name: 'token'
})

export const Register = new ApiDataWithAuth({
  url: Host + '/api/Registered',
  description: '注册',
  version: '1.0',
  request: {
    url: Host + '/api/Registered',
    method: 'POST',
    data: {
      username: '',
      password: ''
    }
  },
  storage_name: 'token'
})
