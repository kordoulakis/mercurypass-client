<script setup>
import NavBar from '@/views/NavBar.vue';
import Footer from '@/views/Footer.vue';

import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const adminView = ref(false)

watch(route, async () => {
  if (route.fullPath.includes('admin'))
    adminView.value = true;
  else
    adminView.value = false;
})

</script>

<template>
  <div class="app-container">
    <NavBar v-if="!adminView" />
    <router-view :key="$route.fullPath"> </router-view>
    <Footer v-if="!adminView" />
  </div>
</template>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
// font-family: 'Lato', sans-serif;
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,500;0,700;1,500&display=swap');
//font-family: 'Raleway', sans-serif;

html,
body {
  margin: 0;
  padding: 0;
}



.app-container {
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: hidden;
}
</style>