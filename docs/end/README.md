# 移动端交互文档
本文档仅用于前后端交互使用

# 用户认证
> 用户认证，使用token认证的方式认证，不采用cookies的方式认证

## 用户登陆

### 前端请求 Request

> 本数据包含在Request中的Body部分

```json
{
  "username": "admin",
  "password": "admin"
}
```

### 后端响应 Response

> 后台发送数据格式应该为json

```json
  "code":20,
  "message": "",
  "data": {
    "access_token": "sdklvjhaa68s4v5a6s4ef64F1c6ef43F4",
    "exp": 3600,
    "token_type": "Basic",
    "username": "user"
  }
```

```code```是状态代码，前后端做如下协定（暂行）：
- ```code = 20```用户登陆成功
- ```code = 21```用户注册成功
- ```code = 22```操作成功
- ```code = 40```用户名或者密码错误
- ```code = 41```用户权限错误
- ```code = 42```请求次数过多
- ```code = 43```非法注册

```message```是服务器对状态的说明
成功时做如下返回：
- ```message = 'success'```请求成功
失败时，应当将错误信息（例如权限错误）一起发送，例子如下：

```json
  "code":41,
  "message": "用户权限不足",
  "data": {}
```

!> 无论请求成功或者失败都必须包含```code```、```message```、```data```,```data```中只能包含前端请求所需要的资源，错误信息请放入到```message```中

## 用户注册

### 前端请求 Request

> 本数据包含在Request中的Body部分

```json
{
  "username": "admin",
  "password": "admin"
}
```

### 后端响应 Response

> 后台发送数据格式应该为json

注册成功做出如下响应

```json
  "code":21,
  "message": "",
  "data": {
    "access_token": "sdklvjhaa68s4v5a6s4ef64F1c6ef43F4",
    "exp": 3600,
    "token_type": "Basic",
    "username": "user"
  }
```

失败时，下面列举一个例子：
```json
  "code":43,
  "message": "非法注册",
  "data": {}
```

