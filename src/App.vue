<script>
  import NavBar from './components/NavBar.vue'

  export default {
    components: {
      NavBar,
    },
    setup() {
    }
  }
</script>

<template>

  <NavBar />

  <router-view />

</template>
