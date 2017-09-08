<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html{
  height: 99%;
  margin: 0px;
}

body {
  background-color: #fbf9fe;
  height: 99%;
  margin: 0px;
}
#app{
  height: 99%;
  margin: 0px;

}
</style>
