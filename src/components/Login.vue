<style lang="less" scoped>

</style>
<template>
  <!-- <div>
        <v-header title="登录">
          <router-link slot="left" to="/">返回</router-link>
        </v-header>
        <form class="login" v-on:submit.prevent="submit">
          <div class="line">
            <div v-show="btn && !form.id">id不能为空</div>
            <input type="number" placeholder="输入你的id" v-model="form.id">
          </div>
          <div class="line">
            <div v-show="btn && !form.name">用户名不能为空</div>
            <input type="text" placeholder="输入你的用户名" v-model="form.name">
          </div>
          <button>登录</button>
        </form>
      </div> -->
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
          <yd-button size="large" type="primary">新用户</yd-button>
        </router-link>
    </yd-cell-group>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '../store/user'

export default {
  data () {
    return {
      btn: true, // true 已经提交过， false没有提交过
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: { // TODO: 第一次登录不能跳转
    ...mapActions([USER_SIGNIN]),
    submit () { // TODO: 这里的逻辑需要重新写
      this.btn = false
      if (Boolean(!this.user.username) || Boolean(!this.user.password)) return
      this.USER_SIGNIN(this.user)
    }
  }
}
</script>
