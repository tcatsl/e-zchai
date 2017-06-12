<template>
</template>
<script>

import { setIdToken, setAccessToken, getIdToken } from '../auth'

export default {
  name: '',
  mounted: function() {
    var vm = this
    this.$nextTick(function() {
      setAccessToken()
      setIdToken()
      var myHeaders = new Headers({
        "Authorization": "Bearer "+getIdToken(),
      })
      var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
      }
      fetch('https://ezchaiserver.herokuapp.com/user/userdata', myInit).then(function(data){

        vm.$router.push('/')
      })
    });
  },
};
</script>
