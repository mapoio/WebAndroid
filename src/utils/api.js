import axios from 'axios'
import md5 from 'md5'

/**
 * Api数据对象接口
 * @class ApiData
 */
class ApiData {
  checkMethod (method) {
    let METHOD = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    if (typeof method !== 'string') {
      throw new Error('Api请求method必须为String')
    }
    if (METHOD.indexOf(method) === -1) {
      throw new Error('Api请求方法不正确，必须为GET，POST，PUT，PATCH，DELETE中的一种，当前请求方法为:' + method)
    }
  }
  checkUrl (url) {
    if (typeof url !== 'string' && url !== '') {
      throw new Error('Api请求url必须为String且不能为空')
    }
  }
  constructor (api) {
    this.checkUrl(api.request.url)
    this.checkMethod(api.request.method)
    api.storage_name = api.storage_name || ''
    api.storage_method = api.storage_method || ''
    api.fn = api.fn || false
    api.request.headers = api.request.headers || {}
    this.api = api
    this.url = this.api.request.url || ''
    this.request = this.api.request || {}
  }
  get fn () {
    return this.api.fn
  }
  get storageMethod () {
    return this.api.storage_method
  }
  get storageName () {
    return this.api.storage_name
  }
  get http () {
    return axios
  }
  get data () {
    return this.api.request.data
  }
  set data (data) {
    this.api.request.data = data
  }
  get req () {
    return this.api.request
  }
  set req (data) {
    this.api.request = data
  }
  get res () {
    return this.api.response || {}
  }
  set res (data) {
    this.api.response = data
  }
  get method () {
    return this.api.request.method
  }
  set method (data) {
    this.checkMethod(data)
    this.api.request.method = data
  }
  /**
   * 使用axios发送最终拼接的数据
   * @param {object} options
   * @returns Promise
   * @memberof ApiData
   */
  send (options) {
    if (typeof options !== 'object') {
      options = {}
    }
    options = options || {}
    let request = Object.assign(options, this.request)
    return this.http(request)
  }
  get headers () {
    return this.api.request.headers
  }
  set headers (headers) {
    this.api.request.headers = headers
  }
  get commonHeaders () {
    return this.http.defaults.headers.common
  }
  set commonHeaders (header) {
    this.http.defaults.headers.common[header.key] = header.value
  }
  set LocalStorage (items) {
    if (this.storageName === '') {
      throw new Error('该接口未指定存储名称（key）')
    }
    localStorage.setItem(this.storageName, JSON.stringify(items))
  }
  set SessionStorage (items) {
    if (this.storageName === '') {
      throw new Error('该接口未指定存储名称（key）')
    }
    sessionStorage.setItem(this.storageName, JSON.stringify(items))
  }
  getLocalStorage () {
    let states = {}
    states = JSON.parse(localStorage.getItem(this.storageName)) || {}
    return states
  }
  getSessionStorage () {
    let states = {}
    states = JSON.parse(sessionStorage.getItem(this.storageName)) || {}
    return states
  }
  removeSessionStorage () {
    if (sessionStorage.getItem(this.storageName) === null) return
    sessionStorage.removeItem(this.storageName)
  }
  removeLocalStorage () {
    if (localStorage.getItem(this.storageName) === null) return
    localStorage.removeItem(this.storageName)
  }
  removeStorage () {
    this.removeLocalStorage()
    this.removeSessionStorage()
    return true
  }
  isNullUndefineEmptyStr (data) {
    return data === '' || data === null || data === undefined
  }
  set storage (items) {
    if (this.storageMethod.toLowerCase() === 'session' || this.storageMethod.toLowerCase() === 'sessionstorage') {
      this.SessionStorage = items
      return true
    }
    this.LocalStorage = items
    return true
  }
  get storage () {
    if (this.isNullUndefineEmptyStr(this.storageName)) {
      return 'No Data Save Storage!'
    }
    if (this.storageMethod.toLowerCase() === 'session' || this.storageMethod.toLowerCase() === 'sessionstorage') {
      return this.getSessionStorage()
    }
    return this.getLocalStorage()
  }
  toMd5 (str) {
    return md5(str).toUpperCase()
  }
}

export default ApiData
