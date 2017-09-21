<template>
    <div>
        <yd-cell-group>
            <yd-navbar title="新用户注册"></yd-navbar>
            <yd-cell-item>
                <span slot="left">用户名：</span>
                <yd-input slot="right" required v-model="user.username" max="20" placeholder="请输入用户名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">密码：</span>
                <yd-input slot="right" type="password" v-model="user.password" placeholder="请输入密码"></yd-input>
                <span slot="left">确认密码：</span>
                <yd-input slot="right" type="password" v-model="user.password" placeholder="请输入密码"></yd-input>
            </yd-cell-item>
            <yd-button size="large" type="primary" v-model="btn" @click.native="submit">登陆</yd-button>
        </yd-cell-group>

        <!-- <yd-cell-group>
            <yd-cell-item>
                <span slot="left">左边内容一</span>
                <span slot="right">右边内容一</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">左边内容二</span>
                <span slot="right">右边内容二</span>
            </yd-cell-item>
        </yd-cell-group> -->
    </div>
</template>

<script type="text/babel">
import { mapActions } from 'vuex'
import { USER_REGISTER } from '../store/user'

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
  methods: {
    ...mapActions([USER_REGISTER]),
    submit () {
      this.btn = false
      if (Boolean(!this.user.username) || Boolean(!this.user.password)) return
      this.USER_REGISTER(this.user)
    }
  }
}
</script>