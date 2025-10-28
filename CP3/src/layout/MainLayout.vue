<template>
    <div class="grid-container"> <!-- class="app-container" -->
        <the-navbar></the-navbar>
        <!-- <div > class="container with-nav" -->
            <app-message />
            <router-view/>
        <!-- </div> -->
        <div class="grid-footer">
            <p>ПАО "АЭСК", 2025</p>
        </div>
    </div>

</template>

<script>
import TheNavbar from '../components/TheNavbar.vue';
import AppMessage from '../components/ui/AppMessage.vue'


export default {

    components: {TheNavbar, AppMessage}
}
</script>

<style scoped>

</style>