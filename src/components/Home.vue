<template>
  <div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">前端项目演示</span>
        <span slot="right">实时天气查询</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">点击下方的天气查询</span>
        <span slot="right"></span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({ user: state => state.user })
}
</script>
