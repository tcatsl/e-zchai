// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from '@/components/auth'
import Hello from '@/components/hello'
import chai from 'chai'
import Vuetify from 'vuetify'
Vue.config.productionTip = true


/* eslint-disable no-new */
var assert = chai.assert
Vue.use(Vuetify)
var x = Object.getOwnPropertyNames(assert).filter(function (p) {
    return typeof assert[p] === 'function';
  })
  console.log(x)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Hello, Auth }
});
