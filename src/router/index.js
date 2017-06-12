import Vue from 'vue'
import Router from 'vue-router'
import env from '@/components/env'
// import Hello1 from '@/components/Hello1'
import navMenu from '@/components/navMenu'
import callback from '@/components/callback'
// import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'env',
      component: env,
    },
    {
      path: '/callback',
      component: callback
    },
    {
      path: '/:id',
      component: env,
      props: true
    }
  ],

  mode: 'history'
})
