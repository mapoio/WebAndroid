<template>
  <div>
    <yd-navbar title="登陆调试页"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">用户名</span>
        <span slot="right"> {{user.username}} </span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">Token类型</span>
        <span slot="right"> {{user.token_type}} </span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">Token过期时间</span>
        <span slot="right"> {{user.exp}} </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="访问Token">
        <yd-cell-item>
            <yd-textarea slot="right" v-text="user.access_token" maxlength="100" readonly></yd-textarea>
        </yd-cell-item>
    </yd-cell-group>
    <router-link to="/Android">
        <yd-button size="large" type="primary">安卓接口测试</yd-button>
    </router-link>
    <div v-if="islogin">
      <router-link to="/login">
        <yd-button size="large" type="primary">登录</yd-button>
      </router-link>
    </div>
    <div v-else>
      <router-link to="/logout">
        <yd-button size="large" type="danger">注销</yd-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: mapState({
    user: state => state.user,
    islogin: Boolean(state => state.user.access_token)
  })
}
</script>
