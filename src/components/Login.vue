<style lang="less" scoped>
.login {
  padding: 50px;
  text-align: center;
  .line {
    padding: 5px;
    input {
      padding: 0 10px;
      line-height: 28px;
    }
  }
  button {
    padding: 0 20px;
    margin-top: 20px;
    line-height: 28px;
  }
}
</style>
<template>
  <div>
    <v-header title="登录">
      <!-- <router-link slot="left" to="/">返回</router-link> -->
    </v-header>
    <form class="login" v-on:submit.prevent="submit">
      <div class="line">
        <div v-show="btn && !form.username">username不能为空</div>
        <input type="text" placeholder="输入你的username" v-model="form.username">
      </div>
      <div class="line">
        <div v-show="btn && !form.password">用户名不能为空</div>
        <input type="password" placeholder="输入你的用户名" v-model="form.password">
      </div>
      <button>登录</button>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '../store/user'

export default {
  data () {
    return {
      btn: false, // true 已经提交过， false没有提交过
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: { // TODO: 第一次登录不能跳转
    ...mapActions([USER_SIGNIN]),
    submit () { // TODO: 这里的逻辑需要重新写
      this.btn = true
      if (Boolean(!this.form.username) || Boolean(!this.form.password)) return
      this.USER_SIGNIN(this.form)
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
