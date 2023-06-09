<script>
import { ref } from 'vue'
import { orderService } from '../services/orderServices'
    export default{
        setup(props, {emit}) {

            const timeToDelivery = ref(orderService.getDeliveryTime());

            const closeModal = () => {
                emit('closeModal')
            }
            return {closeModal, timeToDelivery}
        }
    }
</script>

<template>
    <div class="backdrop">
        <div class="modal">
            <p>Thank you for your purchase!</p>
            <em style="color: red;">Expected time to delivery: {{ timeToDelivery }}min</em>
            <hr />
            <router-link to="/"><button @click="closeModal">Return to main</button></router-link>
        </div>
    </div>
</template>

<style>
    .modal {
        width: 40vw;
        padding: 5vw;
        margin: 20vw auto;
        background: rgb(255, 255, 255);
        border-radius: 10px;
        text-align: center;
        color: black
    }
    .backdrop {
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }

    /* @click.self="closeModal"> */
</style>