<script>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import Burger from '../components/Burger.vue'
import Side from '../components/Side.vue'
import { orderService } from '../services/orderServices';
import Drink from '../components/Drink.vue';
import AddedToCartModal from '../components/AddedToCartModal.vue';

    export default {
        components: {
            Burger,
            Side,
            Drink,
            AddedToCartModal
        },
        setup() {

            const product = ref({});
            const route = useRoute();
            const router = useRouter();
            const isShowingAddedToCartModal = ref(false);


            let productType = route.params.type;

            onMounted(async () => {
                await fetch(`http://localhost:7000/products/${route.params.id}`)
                    .then(res => res.json())
                    .then(data => product.value = data)
                    .catch(err => console.log(err.message))
            });
                            
            const addToCart = (quantity) => {
                orderService.addProductToCart(product, quantity);

                isShowingAddedToCartModal.value = true;
            }

            const goToMenu = () => {
                router.push("/menu")
            }

            const goToCheckOut = () => {
                router.push("/checkout")
            }

            return {product, productType, addToCart, isShowingAddedToCartModal, goToMenu, goToCheckOut};

        },
    }
</script>

<template>
    <AddedToCartModal v-if="isShowingAddedToCartModal"
        :name = "product.name"
        :quantity = "product.quantity"
        @continueShopping="goToMenu"
        @proceedToCheckout="goToCheckOut" />
    <div v-if="productType === 'burger'">
        <Burger 
         :name = "product.name"
         :id = "product.id"
         :description="product.description"
         :price="product.price"
         :ingredients="product.ingredients"
         :image="product.image"
         @add-to-cart="addToCart"
        /> 
    </div>
    <div v-else-if="productType === 'sides'">
        <Side 
            :name = "product.name"
            :id = "product.id"
            :description = "product.description"
            :price = "product.price"
            :image = "product.image"
            :isFavorite="product.isFavorite"
            @add-to-cart="addToCart"
        />
    </div>
    <div v-else>
        <Drink 
            :id="product.id"
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :image="product.image"
            :isFavorite="product.isFavorite"
            @add-to-cart="addToCart"
        />
    </div>

</template>