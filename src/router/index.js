import Vue from 'vue'
import Router from 'vue-router'
import env from '@/components/env'
// import Hello1 from '@/components/Hello1'
import Auth from '@/components/auth'
import callback from '@/components/callback'
// import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/env/',
      name: 'env',
      component: env,
    },
    {
      path: '/',
      component: env,
    },
    {
      path: '/callback',
      component: callback
    },
    {
      path: '/env/:id',
      component: env,
      props: true
    }
  ],

  mode: 'history'
})
