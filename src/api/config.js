import ApiData from '../utils/api'

const DevHost = 'http://demo.outao.wang'
const TestHost = 'http://outao.wang:8080'
const ProductionHost = 'http://demo.outao.wang'

const TIME_STAMP = 'Timestamp'
const NONCE = 'Nonce'
const STAFFID = 'Staffid'
const SIGNATURE = 'Signature'
const MAX = 9999999999
const MIN = 1000000000
const TOKEN_NAME = 'token'

let Host = TestHost

if (process.env.NODE_ENV === 'development') {
  Host = DevHost
} else if (process.env.NODE_ENV === 'production') {
  Host = ProductionHost
}

class ApiDataWithAuth extends ApiData {
  getStaffId () {
    if (!this.isNullUndefineEmptyStr(this.http.defaults.headers.common[STAFFID])) {
      return this.http.defaults.headers.common[STAFFID]
    }
    let data = JSON.parse(localStorage.getItem(TOKEN_NAME))
    if (this.isNullUndefineEmptyStr(data) || this.isNullUndefineEmptyStr(data).username) {
      return 'no_username'
    }
    return data.username || 'no_username'
  }
  getToken () {
    let data = JSON.parse(localStorage.getItem(TOKEN_NAME))
    if (this.isNullUndefineEmptyStr(data) || this.isNullUndefineEmptyStr(data).access_token) {
      return ''
    }
    console.log(data.access_token || '')
    return data.access_token || ''
  }
  objectSort (obj) {
    let newkey = Object.keys(obj).sort()
    if (newkey.length === 0) {
      return {}
    }
    let newObj = {}
    for (let i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]]
    }
    return newObj
  }
  objectSortToStr (obj) {
    let newkey = Object.keys(obj).sort()
    if (newkey.length === 0) {
      return ''
    }
    let str = ''
    for (let i = 0; i < newkey.length; i++) {
      str = str + newkey[i]
      if (typeof obj[newkey[i]] === 'object') {
        str = str + JSON.stringify(obj[newkey[i]])
        continue
      }
      if (this.isNullUndefineEmptyStr(obj[newkey[i]])) {
        continue
      }
      str = str + String(obj[newkey[i]])
    }
    return str
  }
  dataToStr () {
    if (this.method === 'GET') {
      console.log(this.objectSortToStr(this.api.request.params))
      return this.objectSortToStr(this.api.request.params)
    } else {
      console.log(this.objectSortToStr(this.api.request.data))
      return this.objectSortToStr(this.api.request.data)
    }
  }
  getAuthHeaders () {
    let now = Date.parse(new Date()) / 1000
    let headers = {
      [TIME_STAMP]: now.toString(),
      [NONCE]: Math.floor(Math.random() * MAX) + MIN,
      [STAFFID]: this.getStaffId(),
      [SIGNATURE]: this.toMd5(this[TIME_STAMP] + this[NONCE] + this[STAFFID] + this.getToken() + this.dataToStr())
    }
    console.log(`${headers[TIME_STAMP]}${headers[NONCE]}${headers[STAFFID]}${this.getToken()}${this.dataToStr()}`)
    return headers
  }
  send (options) {
    if (typeof options !== 'object') {
      options = {}
    }
    options = options || {}
    this.headers = this.getAuthHeaders()
    let request = Object.assign(options, this.request)
    return this.http(request)
  }
}

export default {
  Host: Host,
  ApiData: ApiData,
  ApiDataWithAuth: ApiDataWithAuth
}
