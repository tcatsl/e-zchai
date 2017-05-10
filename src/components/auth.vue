<template>
  <nav class="navbar navbar-default">
        <button id="logOut" class="btn btn-danger log" v-show="true == false" @click="handleLogout()">Log out</button>
        <button id="logIn" class="btn btn-info log" v-show="true == false" @click="handleLogin()">Log In</button>
  </nav>
</template>

<script>
import { isLoggedIn, login, logout } from '../auth';
var payload = {
    name: 'thomas',
    score: 2
};
var data = new FormData();
data.append( "json", JSON.stringify( payload ) );

var myHeaders = new Headers({ 'Authorization': 'Bearer '+ localStorage.getItem('idToken') });
var myInit = { method: 'POST',
               headers: myHeaders,
               body: data,
               mode: 'cors',
               cache: 'default' };
function post(){
fetch('https://radiant-savannah-12174.herokuapp.com/', myInit).then(response => response.json().then( json => console.log(json)))
}
export default {
  name: 'app-nav',
  methods: {
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
</style>
