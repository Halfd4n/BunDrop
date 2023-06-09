<script>
  export default {
    props: ['name'],
    setup(props, {emit}) {

    }
  }
</script>

<template>
    <div class="backdrop">
        <div class="added-to-cart-modal">
          <h4>Thank you! {{ name }} was added to the shopping cart!</h4>
          <div class="btn-container">
          <button title="Continue shopping" @click="$emit('continueShopping')">More <font-awesome-icon icon="fa-solid fa-burger"/> <font-awesome-icon icon="fa-solid fa-burger"/>  please..</button>
          <button title="Proceed to checkout" @click="$emit('proceedToCheckout')"><font-awesome-icon icon="fa-solid fa-cash-register"/></button>
          </div>
        </div>

    </div>  

</template>

<style scoped>
    .added-to-cart-modal {
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
        background-color: rgb(255, 255, 255);
        width: 50vw;
    }

    h4 {
      color: rgb(55, 193, 55)
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