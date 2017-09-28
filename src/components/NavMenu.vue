<template>
  <div id="navMain">
    <h5 id="header">
      <a href='/' data-step="16" data-intro="Try signing up or logging in to save your snippets for later use and sharing with others. Happy testing!" id="home"><b>e-zchai</b></a> (<a id="link" href="http://chaijs.com/api/assert/" data-step="10" data-intro="Here is a quick link to the Chai documentation, in case you need more information on an assertion function." target="_blank">reference</a>)
      <v-btn id="logOut" v-if="isLoggedIn()" dark class="btn btn-danger log"  v-on:click.native="handleLogout()">
        <b>Log out</b>
      </v-btn>
      <v-btn id="logIn" v-if="!isLoggedIn()" dark class="btn btn-info log"  v-on:click.native="handleLogin()">
        <b>Log In</b>
      </v-btn>
      <v-btn id="save" v-if="isLoggedIn()" dark class="btn white--text btn-info save green lighten-1" light v-on:click.native="saveNew()">
        <b>Save New</b>
      </v-btn>
      <v-dialog v-model="loadDialog" scrollable>
        <v-btn primary @click.native="getEnvs()" v-show="isLoggedIn()" light slot="activator">
          <b>Load Snippet</b>
        </v-btn>
        <v-card>
          <v-card-title>
            Select Snippet
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
            <v-btn class="blue--text darken-1 white--text" flat @click.native="loadDialog = false">
              Close
            </v-btn>
            <v-btn class="blue--text darken-1  white--text" flat @click.native="loadEnv(envToLoad)">
              Load
            </v-btn>
          </v-card-row>
        </v-card>
      </v-dialog>
      <v-dialog  v-model="removeDialog">
        <v-btn v-if="$parent.checkEmail()" light @click.native="getEnvs()" primary class="  white--text red" light slot="activator">
          <b>Delete Snippet</b>
        </v-btn>
        <v-card>
          <v-card-row>
            <v-card-title>
              Are you sure you want to delete this snippet?
            </v-card-title>
          </v-card-row>
          <v-card-row>
            <v-card-text>
              This action cannot be undone.
            </v-card-text>
          </v-card-row>
          <v-card-row actions>
            <v-btn class="red--text darken-1 white--text" flat="flat" @click.native="removeDialog = false">
              Nevermind
            </v-btn>
            <v-btn class="red--text darken-1 white--text" flat="flat" @click.native="deleteEnv($parent.id)">
              Delete
            </v-btn>
          </v-card-row>
        </v-card>
      </v-dialog>
      <v-btn class="deep-purple accent-2 white--text" light v-on:click.native="startIntro()"><b>Tutorial</b></v-btn>
    </h5>
    <v-text-field v-show="!!$parent.id && $parent.checkEmail()" :placeholder="$parent.name" label="The name for your snippet:" v-model="$parent.name" @keyup.native='$parent.buildTests()'>
    </v-text-field>
    <p v-if="!!$parent.id && !$parent.checkEmail()">
      {{$parent.name}}
    </p>
  </div>
</template>

<script>
import { isLoggedIn, getIdToken, login, logout, returnEmail } from '../auth'
var vm

export default {
  name: 'auth',
  data: function() {
    return {
      envToLoad: null,
      envs: [],
      loadDialog: false,
      removeDialog: false
    }
  },
  props: ['id', 'tests', 'code', 'envname'],
  methods: {
    getEnvs: function(){
      setTimeout(function(){
        var dialogs = document.getElementsByClassName('dialog--active')
      // alert(z.length)
        Array.prototype.forEach.call(dialogs, function(el, ind, arr){
        el.style.width = "80%"
        })
      }, 200)
      var myHeaders = new Headers({
        "Authorization": "Bearer "+getIdToken()
      })
      var myInit = {
        method: 'GET',
        headers: myHeaders,
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
      window.location.pathname = '/'+envId
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
          window.location.pathname = '/'
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
          code: JSON.stringify(document.getElementsByClassName('cm-s-default')[0].innerText)
        })
      }
      fetch('https://ezchaiserver.herokuapp.com/env/', myInit).then(function(res){
        res.json().then(function(json){
          window.location.pathname = '/'+json
        })
    })
  },
    handleLogin: function() {
      login()
    },
    handleLogout: function() {
      logout()
    },
    isLoggedIn: function() {
      return isLoggedIn()
    },
    returnEmail: function(){
      return returnEmail()
    },
    startIntro: function(){
      document.getElementById('add1').click()
      setTimeout(function(){introJs().start()}, 3000)
    }
  },
  directives: {

  },
  mounted: function() {
    vm= this
    var token = getIdToken() || null
    if (!!token){
      var myHeaders = new Headers({
        "Authorization": "Bearer "+getIdToken()
      })
      var myInit = {
        method: 'GET',
        headers: myHeaders,
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
#save, #logIn, #logOut, .dialog__container {
  margin-right: 0px;
  margin-left: 10px;
}
.card__text, .card__text .card__text {
     width: 100% !important;
     z-index: ;
}
.dialog__container{
  margin-left: 0px !important;
}
#home{
  color: black;
  text-decoration: none;
}
</style>
