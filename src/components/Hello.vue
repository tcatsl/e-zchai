<template>
<div>
<div class="webgl-content">
  <div id="gameContainer" style="width: 960px; height: 600px"></div>
  <div class="footer">
    <div class="webgl-logo"></div>
    <div class="fullscreen" onclick="gameInstance.SetFullscreen(1)"></div>
    <div class="title">Aphelion Alpha</div>
  </div>
</div>
</div>
</template>

<script>

export default {
  name: 'game'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
