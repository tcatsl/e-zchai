<template>
  <div>
        <h5>e-zchai<v-btn id="logOut" v-if="isLoggedIn()" class="btn btn-danger log"  v-on:click.native>Log out</v-btn>
        <v-btn id="logIn" v-if="!isLoggedIn()"class="btn btn-info log"  v-on:click.native="handleLogin()">Log In</v-btn></h5>
  </div>
</template>

<script>
import { isLoggedIn, login, logout } from '../auth';


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
button {
  float: right
}
</style>
