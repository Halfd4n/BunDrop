<script>
import { onMounted, ref, watch} from 'vue';
    export default {
        props: ['id', 'name', 'price', 'quantity'],
        setup(props, {emit}) {

            const cost = ref(0);
            const quantity = ref(props.quantity);

            onMounted(() => {
                cost.value = props.price * quantity.value;
            })

            watch(quantity, () => {
                cost.value = props.price * quantity.value;
            })

            const alterQuantity = (value, id) => {
                
                quantity.value += parseInt(value);
                
                emit('alterQuantity', value, id);

                emit('alterTotalCost');
            }

            return{cost, quantity, alterQuantity}
        },
    }
</script>

<template>
    <tr>
        <td id="name-column">{{ name }}</td>
        <td id="quantity-column"><button id="decrease-btn" :value="-1" @click="alterQuantity($event.target.value, id)">-</button> {{ quantity }} <button id="increase-btn" :value="1" @click="alterQuantity($event.target.value, id)">+</button></td>
        <td id="price-column">$ {{ price.toFixed(2) }}</td>
        <td id="cost-column">$ {{ cost.toFixed(2) }}</td>
    </tr>
</template>

<style scoped>
    td {
        padding: 1vw;
    }

    #name-column {
        width: 25vw;
    }

    #quantity-column {
        width: 20vw;
    }

    #price-column {
        width: 15vw;
    }

    #cost-column {
        width: 15vw;
    }

    #decrease-btn {
        background-color: rgb(225, 169, 14);
        border: solid black 1px;
        border-radius: 4px;
        margin-right: 0.5vw;
    }

    #decrease-btn:hover {
        background-color: rgb(248, 236, 104);
        color: gold;
        border: solid rgb(255,255,255) 1px;
    }

    #increase-btn {
        background-color: rgb(2, 158, 2);
        border: solid black 1px;
        border-radius: 4px;
        margin-left: 0.5vw;
    }

    #increase-btn:hover {
        background-color: rgb(104, 248, 128);
        color: gold;
        border: solid rgb(255,255,255) 1px;
    }

</style>rgba(27, 105, 44, 0.7)