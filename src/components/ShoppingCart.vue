<script>
    import { onMounted, ref } from 'vue'
    import { orderService } from '../services/orderServices'
    import ShoppingCartItem from '../components/ShoppingCartItem.vue'
    import EmptyShoppingCart from './EmptyShoppingCart.vue'

    export default {
        components: {
            ShoppingCartItem,
            EmptyShoppingCart
        },
        setup() {
            const shoppingCart = ref([])
            const totalCosts = ref(0)
            const isShoppingCartEmpty = ref(true)

            onMounted(() => {
                shoppingCart.value = orderService.getShoppingCartContent();

                if(shoppingCart.value !== null) {
                    shoppingCart.value.forEach(p => {
                    totalCosts.value += (p.quantity * p.price);
                    isShoppingCartEmpty.value = false;
                    })
                }

            })

            const alterQuantity = (value, productId) => {
                orderService.alterQuantity(value, productId);
            }

            const alterTotalCost = () => {

                totalCosts.value = 0;

                shoppingCart.value = orderService.getShoppingCartContent();

                shoppingCart.value.forEach(p => {
                    totalCosts.value += (p.quantity * p.price);
                })

                if(totalCosts.value <= 0) {
                    isShoppingCartEmpty.value = true;
                }
            }

            return {shoppingCart, alterQuantity, alterTotalCost, totalCosts, isShoppingCartEmpty};
        },
    }
</script>

<template>
    <div v-if="isShoppingCartEmpty">
        <EmptyShoppingCart />
    </div>
    <div v-else class="shopping-cart-container">
        <h3>Shopping Cart:</h3>
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price / piece</th>
                <th>Cost</th>
            </tr>
            <ShoppingCartItem v-for="item in shoppingCart"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :price="item.price"
            :quantity="item.quantity"
            @alterQuantity="alterQuantity"
            @alterTotalCost="alterTotalCost"
            />
            <tr >
                <td colspan="3" style="text-align: end; font-weight: bold; padding-right: 8px;">Total:</td>
                <td id="total-costs"><font-awesome-icon icon="fa-solid fa-dollar" /> {{ totalCosts.toFixed(2) }}</td>
            </tr>
        </table>
    </div>
    <div v-if="!isShoppingCartEmpty" class="link-container">
    <router-link :to="{ name: 'Menu'}" title="Return to menu">
        <font-awesome-icon icon="fa-solid fa-burger" />
    </router-link>
    <router-link :to="{ name: 'Checkout'}" title="Proceed to checkout">
        <font-awesome-icon icon="fa-solid fa-cash-register" />
    </router-link>
    </div>

</template>

<style scoped>

    .shopping-cart-container {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        margin-top: 1vw;
        padding: 1.5vw;
    }

    table {
        text-align: center;
        text-justify: center;
        font-weight: bold;
        border: solid rgb(68, 68, 68) 2px;
        border-radius: 2px;
    }

    th {
        background-color: rgb(68, 68, 68);
        padding: 1vw;
        color: rgb(255, 255, 255)
    }

    tr:nth-child(even) {
        background-color:  rgb(191, 71, 50);
    }

    tr:nth-child(odd) {
        background-color: rgb(84, 84, 84)
    }

    #total-costs {
        background-color: rgba(39, 161, 66, 0.7);
        padding: 0.75vw;
        font-weight: bold;

    }

    .link-container {
        display: flex;
        justify-content: end;
        margin: 1vw 3vw 3vw 0;
    }

    .link-container > a {
        font-size: 2vw;
        width: 4.5vw;
        text-align: center;
        text-justify: center;
        margin-left: 1.5vw;
        border: solid rgb(68, 68, 68) 2px;
        border-radius: 4px;
        text-decoration: none;
        padding: 0.5vw;
        color: rgb(255, 255, 255);
        background-color: rgb(84, 84, 84);
    }

    .link-container > a:hover {
        color: gold;
        border: solid gold 2px;
    }

    @media (max-width: 600) {
        .link-container > a {
            font-size: 4vw;
            width: 6vw;
            text-align: center;
            text-justify: center;
            margin-left: 1.5vw;
            border: solid rgb(68, 68, 68) 2px;
            border-radius: 4px;
            text-decoration: none;
            padding: 0.5vw;
            color: rgb(255, 255, 255);
            background-color: rgb(84, 84, 84);
        }
    }

</style>