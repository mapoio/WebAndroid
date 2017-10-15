import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Register from '@/components/Register'
import Android from '@/components/Android'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }, {
      path: '/Register',
      name: 'Register',
      component: Register
    }, {
      path: '/Android',
      name: 'Android',
      component: Android
    }
  ]
})
