<script>
import { ref } from 'vue'
export default {
  props: ['message'],
  setup(props) {
    const message = ref(props.message)

    return {message}
  }
}
</script>

<template>
      <div class="backdrop">
        <div class="message-modal">
          <h4>{{ message }}</h4>
          <div class="btn-container">
          <button title="Close message-box" @click="$emit('closeModal')">Close</button>
          </div>
        </div>
    </div>  
</template>

<style scoped>
    .message-modal {
        padding: 5vw;
        margin: 10rem auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding: 2vw;
        left: 20%;
        border: rgb(68, 68, 68) solid 2px;
        border-radius: 10px;
        background-color: rgba(0, 255, 238, 0.656);
        width: 50vw;
        
    }

    h4 {
      color: rgb(255, 98, 98)
    }

    .backdrop {
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
</style>