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
  components: { App }
});
new Vue({
  el: '#auth',
  router,
  template: '<Auth/>',
  components: { Auth }
});
Vue.directive('do', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    setTimeout(function(){var z = document.getElementsByClassName('expansion-panel__body')
    // alert(z.length)
    Array.prototype.forEach.call(z, function(el, ind, arr){el.style.height = "auto"})
  }, 1500)
  }
})
Vue.directive('do', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    setTimeout(function(){var z = document.getElementsByClassName('expansion-panel__body')
    // alert(z.length)
    Array.prototype.forEach.call(z, function(el, ind, arr){el.style.height = "auto"})
  }, 1500)
  }
})
