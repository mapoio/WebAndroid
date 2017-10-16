<template>
  <div>
    <yd-navbar title="安卓调试页"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">定位地址</span>
        <span slot="right"> {{addresses}} </span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">定位城市</span>
        <span slot="right"> {{city}} </span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">网络状态</span>
        <span slot="right"> {{networkType}} </span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">加速度状态</span>
        <span slot="right"> {{accelera}} </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="primary" @click.native="gps">开始定位</yd-button>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">拍照</span>
        <span slot="right"> {{addresses}} </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="primary" @click.native="getImage">开始拍照</yd-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addresses: '',
      city: '',
      networkType: '',
      accelera: ''
    }
  },
  methods: {
    gps () {
      console.log(this.os)
      this.networkType = this.$plus.networkinfo.getCurrentNetworkType()
      this.$plus.geolocation.getCurrentPosition().then(success => {
        this.addresses = success.addresses
        this.city = success.address.city
      }).catch(err => {
        console.log(err)
      })
      window.plus.accelerometer.watchAcceleration(success => {
        this.accelera = success
      }, function (err) {
        console.log(err)
      })
    },
    getImage () {
      console.log('开始拍照：')
      var cmr = window.plus.camera.getCamera()
      cmr.captureImage(function (p) {
        console.log('成功：' + p)
        window.plus.io.resolveLocalFileSystemURL(p, function (entry) {
          console.log('success cam')
        }, function (e) {
          console.log('读取拍照文件错误：' + e.message)
        })
      }, function (e) {
        console.log('失败：' + e.message)
      }, { filename: '_doc/camera/', index: 1 })
    }
  }
}
</script>
