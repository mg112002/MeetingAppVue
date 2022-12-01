<template>
  <div>
  <MenuBar />
  <div class="content my-4">
    <router-view> </router-view>
  </div>
  </div>
</template>

<script>

import MenuBar from './components/MenuBar.vue'

export default {
  name: 'App',
  components: {
    MenuBar
  }
}
</script>

<style>
* {
  margin: 0;
  font-family: sans-serif;
}
.content{
  margin: 0 5%
}
</style>
