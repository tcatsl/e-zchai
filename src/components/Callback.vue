<template>
</template>
<script>

import { setIdToken, setAccessToken } from '../auth';

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      this.$router.push('/');
    });
  },
};
</script>
