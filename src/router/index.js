import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// import Hello1 from '@/components/Hello1'
import Auth from '@/components/auth'
import callback from '@/components/callback'
// import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    { path: '/callback', component: callback},
    { path: '/game', component: Hello},
      { path: '/:id', component: Hello, props: true }
  ],

  mode: 'history'
})
