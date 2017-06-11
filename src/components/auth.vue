<template>
  <div id="yo">
    <h5 id="header">
      <a href='/env/'><b>e-zchai</b></a>
      <v-btn id="logOut" v-if="isLoggedIn()" class="btn btn-danger log"  v-on:click.native="handleLogout()">
        <b>Log out</b>
      </v-btn>
      <v-btn id="logIn" v-if="!isLoggedIn()" class="btn btn-info log"  v-on:click.native="handleLogin()">
        <b>Log In</b>
      </v-btn>
      <v-btn id="save" v-if="isLoggedIn()" class="btn btn-info save green lighten-1" light v-on:click.native="saveNew()">
        <b>Save New</b>
      </v-btn>
      <v-dialog v-xwidth v-model="dialog" scrollable>
        <v-btn primary @click.native="getEnvs()" v-show="isLoggedIn()" light slot="activator">
          <b>Load Environment</b>
        </v-btn>
        <v-card>
          <v-card-title>
            Select Environment
          </v-card-title>
          <v-divider>
          </v-divider>
          <v-card-row height="300px">
            <v-card-text>
              <v-radio v-for="env in envs" :label="env.name" v-model="envToLoad" :value="env.short_id">
              </v-radio>
            </v-card-text>
          </v-card-row>
          <v-divider>
          </v-divider>
          <v-card-row actions>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">
              Close
            </v-btn>
            <v-btn class="blue--text darken-1" flat @click.native="loadEnv(envToLoad)">
              Load
            </v-btn>
          </v-card-row>
        </v-card>
      </v-dialog>
      <v-dialog v-xwidth v-model="dialog2" persistent>
        <v-btn v-if="$parent.checkEmail()" @click.native="getEnvs()" primary class="red" light slot="activator">
          <b>Delete Environment</b>
        </v-btn>
        <v-card>
          <v-card-row>
            <v-card-title>
              Are you sure you want to delete this environment?
            </v-card-title>
          </v-card-row>
          <v-card-row>
            <v-card-text>
              This action cannot be undone.
            </v-card-text>
          </v-card-row>
          <v-card-row actions>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">
              Nevermind
            </v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click.native="deleteEnv($parent.id)">
              Delete
            </v-btn>
          </v-card-row>
        </v-card>
      </v-dialog>
    </h5>
    <v-text-field v-show="!!$parent.id && $parent.checkEmail()" :placeholder="$parent.name" label="The name for your environment:" v-model="$parent.name" @keyup.native='$parent.buildTests()'>
    </v-text-field>
    <p v-if="!!$parent.id && !$parent.checkEmail()">
      {{$parent.name}}
    </p>
  </div>
</template>

<script>
import { isLoggedIn, getIdToken, login, logout, returnEmail } from '../auth';

var vm
export default {
  name: 'auth',
  data: function() {
    return {
      envToLoad: null,
      envs: [],
      dialog: false,
      dialog2: false
    }
  },
  props: ['id', 'tests', 'code', 'envname'],
  methods: {
    getEnvs: function(){
      setTimeout(function(){
        var z = document.getElementsByClassName('dialog--active')
      // alert(z.length)
        Array.prototype.forEach.call(z, function(el, ind, arr){
        el.style.width = "80%"
        })
      }, 200)
      var zHeaders = new Headers({
        "Authorization": "Bearer "+getIdToken()
      })
      var myInit = {
        method: 'GET',
        headers: zHeaders,
        mode: 'cors',
        cache: 'default'
      }
      fetch('https://ezchaiserver.herokuapp.com/env/myenvs', myInit).then(function(res){
          res.json().then(function(json){
            vm.envs = json
          })
      })
    },
    loadEnv: function(envId){
      window.location.pathname = '/env/'+envId
    },
    deleteEnv: function(envId){
      var myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+getIdToken(),
      })
      var myInit = {
        method: 'delete',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
      }
      fetch('https://ezchaiserver.herokuapp.com/env/'+this.$parent.id, myInit).then(function(res){
        res.json().then(function(json){
          window.location.pathname = '/env/'
        })
      })
    },
    saveNew: function(){
      var myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+getIdToken(),
      })
      var myInit = {
        method: 'post',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          name: this.name,
          private: false,
          tests: JSON.stringify(this.$parent.tests),
          name: this.$parent.name,
          code: document.getElementsByClassName('cm-s-default')[0].innerText
        })
      }
      fetch('https://ezchaiserver.herokuapp.com/env/', myInit).then(function(res){
        res.json().then(function(json){
          window.location.pathname = '/env/'+json
        })
    })
  },
    handleLogin: function() {
      login();
    },
    handleLogout: function() {
      logout();
    },
    isLoggedIn: function() {
      return isLoggedIn();
    },
    returnEmail: function(){
      return returnEmail()
    }
  },
  directives: {
    xwidth: {
      // When the bound element is inserted into the DOM...
      inserted: function (el1) {
        // Focus the element
        setTimeout(function(){
          var z = document.getElementsByClassName('dialog--active')
        // alert(z.length)
          Array.prototype.forEach.call(z, function(el, ind, arr){
          el.style.width = "80%"
          })
        }, 2000)
      }
    }
  },
  mounted: function() {
    vm= this
    var token = getIdToken() || null
    if (!!token){
      var zHeaders = new Headers({
        "Authorization": "Bearer "+getIdToken()
      })
      var myInit = {
        method: 'GET',
        headers: zHeaders,
        mode: 'cors',
        cache: 'default'
      }
      fetch('https://ezchaiserver.herokuapp.com/env/myenvs', myInit).then(function(res){
        res.json().then(function(json){
          vm.envs = json
        })
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  float: right;
  margin: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.card {
  background-color: #FFFFFF;
}
.dialog--active {
  width: 80% !important;
}
#yo {
  padding-left:0;
  padding-right: 0;
}
#save, #logIn, #logOut, .dialog__container {
  margin-right: 0px;
  margin-left: 10px;
}
#logOut{
}
.card__text, .card__text .card__text {
     width: 100% !important;
     z-index: ;
}
.dialog__container{
  margin-left: 0px !important;
}
a{
  color: black;
  text-decoration: none;
}
</style>
