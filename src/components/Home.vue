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
    <yd-button size="large" type="primary" @click.native="createRace">POST接口测试</yd-button>
    <yd-button size="large" type="primary" @click.native="getAllUsers">GET接口测试</yd-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { CreateRace, GetUsers } from '../api/admin'

export default {
  data () {
    return {
    }
  },
  methods: {
    createRace () {
      console.log('POST')
      CreateRace.data.time = Date.parse(new Date()) / 1000
      console.log(CreateRace)
      CreateRace.send().then((success) => {
        console.log(success)
      }).catch((reject) => {
        console.log(reject)
      })
    },
    getAllUsers () {
      console.log('GET')
      console.log(GetUsers)
      GetUsers.send().then((success) => {
        console.log(success)
      }).catch((reject) => {
        console.log(reject)
      })
    }
  },
  computed: mapState({
    user: state => state.user,
    islogin: Boolean(state => state.user.access_token)
  })
}
</script>
