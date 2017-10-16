import evt from './vhp/event'
import os from './vhp/os'
import nativeUI from './vhp/nativeUI'
import accelerometer from './vhp/accelerometer'
import geolocation from './vhp/geolocation'
import networkinfo from './vhp/networkinfo'
import toPromise from './vhp/toPromise'
import _ from './utils'

const VueH5Plus = {}

let h5plus = {
  accelerometer: accelerometer,
  geolocation: geolocation,
  nativeUI: nativeUI,
  networkinfo: networkinfo,
  toPromise: toPromise
}

function install (Vue) {
  if (install.installed) return
  install.installed = true

  Vue.mixin({
    beforeCreate () {
      if (os.plus) {
        let _options = this.$options
        evt.plusReady(function () {
          if (_.isFunction(_options.plusReady)) {
            _options.plusReady.call(this)
          }
          if (_.isFunction(_options.listenNetwork)) {
            evt.listenNetwork(function () {
              _options.listenNetwork.call(this)
            })
          }
          // 隐藏滚动条
          window.plus.webview.currentWebview().setStyle({
            scrollIndicator: 'none'
          })
          var first = null
          window.plus.key.addEventListener('backbutton', function () {
            // 首次按键，提示‘再按一次退出应用’
            if (new Date().getTime() - first < 400) {
              window.plus.runtime.quit()
            }
            window.location.href = document.referrer
            first = new Date().getTime()
          }, false)
          /* eslint-disable no-new-func */
          document.onselectstart = new Function('event.returnValue=false;')
          // 禁止浏览器的复制事件，提高响应速度
        }.bind(this))
      }
    }
  })

  Vue.prototype.plusReady = evt.plusReady
  Vue.prototype.os = os
  Vue.prototype.$plus = h5plus
}

VueH5Plus.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueH5Plus)
}

export default VueH5Plus
