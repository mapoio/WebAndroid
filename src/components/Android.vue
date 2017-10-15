<template>
  <div>
    <yd-navbar title="安卓调试页"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">定位地址</span>
        <span slot="right"> {{addresses}} </span>
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
      city: ''
    }
  },
  methods: {
    gps () {
      let gps = new Promise((resolve, reject) => {
        window.plus.geolocation.getCurrentPosition((position) => {
          resolve(position)
        }, (error) => {
          reject(error)
        })
      })
      gps.then(success => {
        console.log(success)
        this.addresses = success.addresses
      }).catch(err => {
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
