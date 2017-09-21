<style lang="less" scoped>

</style>
<template>
  <div>
    <yd-navbar title="登陆"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">用户名：</span>
        <yd-input slot="right" required v-model="user.username" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" type="password" v-model="user.password" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
      <yd-button size="large" type="primary" v-model="btn" @click.native="submit">登陆</yd-button>
        <router-link to="/register">
          <yd-button size="large" bgcolor="#00ADFD" color="#fff" >新用户</yd-button>
        </router-link>
    </yd-cell-group>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '../store/user'
import Api from '../utils/api'

export default {
  data () {
    return {
      btn: true, // true 已经提交过， false没有提交过
      user: Api.login.request
    }
  },
  methods: {
    ...mapActions([USER_SIGNIN]),
    loading () {
      this.$dialog.loading.open('正在登陆')
      setTimeout(() => {
        this.$dialog.loading.close()
      }, 400)
    },
    submit () { // TODO: 重写这里的逻辑，能够取到登录状态 使用promise
      this.btn = false
      if (Boolean(!this.user.username) || Boolean(!this.user.password)) return
      this.loading()
      this.USER_SIGNIN(this.user)
    }
  }
}
</script>
