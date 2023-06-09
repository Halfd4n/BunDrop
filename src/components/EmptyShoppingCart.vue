<script>

export default {
  setup() {
    
  },
}
</script>

<template>
  <div class="empty-container">
    <h3>Oops! There's nothing in shopping cart, please proceed to the <router-link to="/menu" style="color: black;">menu</router-link>..<font-awesome-icon icon="fa-solid fa-burger" /></h3>
  </div>
</template>

<style scoped>
     .empty-container {
        margin: 4rem;
        color: red;
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 2vw;
        border: rgb(68, 68, 68) solid 2px;       
    }
</style>
