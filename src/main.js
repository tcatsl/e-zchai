// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import auth from '@/components/auth'
import env from '@/components/env'
import Vuetify from 'vuetify'
Vue.config.productionTip = true


/* eslint-disable no-new */
Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, env, auth }
});
