<template>
</template>
<script>

import { setIdToken, setAccessToken, getIdToken } from '../auth';

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      var myHeaders = new Headers({
        "Authorization": "Bearer "+getIdToken(),
      })
      var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
      }
      fetch('https://ezchaiserver.herokuapp.com/user/userdata', myInit).then((data)=> {

      this.$router.push('/');
      })
    });
  },
};
</script>
