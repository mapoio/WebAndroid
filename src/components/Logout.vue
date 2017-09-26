<style lang="less" scoped>
.center{
  text-align: center;
}
</style>
<template>
  <div>
    <yd-navbar title="注销"></yd-navbar>
    <div class="center">
        <yd-icon name="warn" size="4rem" color="#FF685D" ></yd-icon>
    </div>
    <router-link to="/login">
      <yd-button size="large" type="danger" @click.native="submit">注销</yd-button>
    </router-link>
    <router-link to="/">
      <yd-button size="large" type="primary">返回</yd-button>
    </router-link>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { USER_SIGNOUT } from '../store/user'
export default {
  methods: {
    ...mapActions([USER_SIGNOUT]),
    submit () {
      let signout = new Promise((resolve, reject) => {
        this.$dialog.loading.open('正在注销')
        resolve(this.USER_SIGNOUT())
      })
      signout.then(data => {
        this.$dialog.loading.open('注销成功')
        setTimeout(() => {
          this.$dialog.loading.close()
          this.$router.replace({ path: '/login' })
        }, 1000)
      }).catch(data => {
        this.$dialog.loading.open('注销失败')
        setTimeout(() => {
          this.$dialog.loading.close()
        }, 1000)
        throw new Error('用户无法注销')
      })
    }
  }
}
</script>
