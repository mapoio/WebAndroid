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
let DevHost = 'http://easy-mock.com/mock/59b39867e0dc663341a34043/webandroid'

export default {
  login: {
    url: DevHost + '/login',
    description: '登录',
    version: '1.0',
    methods: ['POST', 'PATCH'],
    request: {username: 'username', password: 'password123'},
    response: {
      access_token: 'by0hw463vLbvsXlvol04K1f72UiCltjwH1mD4t3hCcRkwBsxl9fkeeoOv2hBls8y3UpY8D65g2W4o4hk1cjxzmjnvY7m72x0zjkRuklnxuUKI8ybrio0YjOT0nyLnbwICGqVx8eqymxg15s0a59vvBkm13Zu8fp5OqEfc0atImHx277GGhyUlc45ssnWid8q3p1sm7ffkXCVrhkp6nE5aovQB4vneanoppLXhjNixmdit4frN100oo6zccJmh0c6',
      expires_in: '2017-09-09 17:21:37',
      token_type: 'bearer',
      userName: 'fZ3jM5uJ5'
    }
  }
}
