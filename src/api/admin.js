import API from './config'

const Host = API.Host
const ApiDataWithAuth = API.ApiDataWithAuth

export const CreateRace = new ApiDataWithAuth({
  description: '管理员创建赛事',
  version: '1.0',
  request: {
    url: Host + '/api/Race/CreateRace',
    method: 'POST',
    data: {
      Name: '测试',
      Count: 200,
      Money: 200,
      time: 0
    }
  }
})

export const GetUsers = new ApiDataWithAuth({
  description: '获取所有用户信息',
  version: '1.0',
  request: {
    url: Host + '/api/admin/GetAllStudentImformation',
    method: 'GET',
    data: {
      Name: '测试',
      Count: 200,
      Money: 200,
      time: 0
    }
  }
})