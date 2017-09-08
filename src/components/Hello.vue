<template>
  <div id="login">
    <h2>工作室管理系统</h2>
    <p>新系统，新开始</p>
    <x-button link='/login' type="primary" plain class="bottom-buttom">登陆</x-button>
    <x-button link='/regedit' type="primary" class="bottom-buttom">注册</x-button>
  </div>
</template>
<script>
  import { XButton, Tabbar } from 'vux'
  export default{
    components: {
      XButton,
      Tabbar
    },
    data () {
      return {
      }
    }
  }
</script>
<style>
#login{
  padding:15px 15px 15px 15px;
  text-align: center;
  height: 99%;
  background-image: url(http://bizhi.zhuoku.com/2013/10/zhuoku/zhuoku004.jpg);
  color: white;
}
.bottom-buttom{
  color: white;
  margin-top: 500px;
}
</style>
