<template>
  <component :is="layout + '-layout' " v-if="layout"></component>
  <!--<main-layout></main-layout> 
  <auth-layout></auth-layout>
  <router-vew></router-vew> -->
</template>

<script>
import {computed} from 'vue'
import { useRoute } from 'vue-router';
import MainLayout from './layout/MainLayout.vue'
import AuthLayout from './layout/AuthLayout.vue'

  export default {
    setup() {
      const route = useRoute()

      return {
        layout: computed(() => route.meta.layout)
      }
    },
    components: {MainLayout, AuthLayout}
  }
</script>

<style scoped>

</style>
