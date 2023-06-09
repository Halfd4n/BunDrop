<script>
import { watch, ref, onMounted } from 'vue'
import { userService } from '../services/userServices';
import MessageModal from './MessageModal.vue';
    export default {
        props: ['id', 'name', 'price', 'description', 'ingredients', 'image'],
        components: {
            MessageModal
        },
        setup(props) {

            const formattedIngredients = ref([])
            const quantityValue = ref(1);
            const showErrorMessage = ref(false);
            const isFavoriteProduct = ref(false);
            const userIds = ref([]);
            const signedInUser = ref({});
            const isShowingMessageModal = ref(false);

            watch(props, () => {
                formattedIngredients.value = props.ingredients.join(", ") + `.`;
            })

            onMounted(() => {
                fetch('http://localhost:7001/users')
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(d => userIds.value.push(d.id));
                        })
            });

            watch(() => [...userIds.value], () => {
                signedInUser.value = userService.isThereAUserSignedIn(userIds.value)

                if(signedInUser.value !== null) {
                        signedInUser.value.favoriteProductsId.forEach(productId => {
                                if(props.id === productId){
                                    isFavoriteProduct.value = true;
                                }
                        })
                }
            });

            
            const noticeChangeInQuantityInput = (e) => {
                if(e.target.value <= 0){
                    showErrorMessage.value = true;
                } 
                else {
                    showErrorMessage.value = false;

                    quantityValue.value = e.target.value;
                }        
            }

            const toggleFavorite = () => {

                if(signedInUser.value !== null){
                    isFavoriteProduct.value = userService.toggleFavoriteProduct(props.id, signedInUser.value);
                } else {
                    isShowingMessageModal.value = true;
                }

            }

            const closeModal = () => {
                isShowingMessageModal.value = false;
            }

            return {formattedIngredients, quantityValue, noticeChangeInQuantityInput, showErrorMessage, isFavoriteProduct, toggleFavorite, isShowingMessageModal, closeModal}
        }
    }
</script>

<template>
    <MessageModal v-if="isShowingMessageModal" @closeModal="closeModal" :message="`Must be signed in to add favorites`"/>
    <div class="burger-card">
        <div class="burger-image">
            <img :src="image"> 
        </div>
        <div class="favorite-container">
            <button title="Remove favorite mark"  id="is-favorite-button" v-if="isFavoriteProduct"><font-awesome-icon icon="fa-solid fa-star" @click="toggleFavorite"/></button>
            <button title="Mark as favorite" id="is-non-favorite-button" v-else><font-awesome-icon icon="fa-regular fa-star" @click="toggleFavorite" /></button>
        </div>
        <div class="burger-info">    
            <h4>{{ name }}</h4>
            <p style="margin-bottom: 1vw;">{{ description }}</p>
            <p>Starring: {{ formattedIngredients }} </p>
            <hr/>
            <h5 class="dollar-green"><font-awesome-icon icon="fa-solid fa-dollar" /> {{ price }}</h5>
        </div>
        <div class="burger-interaction">
            <div>
 <label style="margin-right: 0.5rem;" for="quantity-input">Quantity: </label>
            <input id="quantity-input" type="number" min="1" :value="quantityValue" @input="(e) => noticeChangeInQuantityInput(e)"/>
            </div>
            <button id="add-to-cart-btn" @click="$emit('add-to-cart', quantityValue)"><font-awesome-icon icon="fa-solid fa-basket-shopping" /></button>
        </div>
        <div class="message-container">
            <hr />
            <em class="warning" v-if="showErrorMessage">Quantity can't be below one!</em>
        </div>
    </div>
</template>


<style scoped>

    .burger-card {
        display: grid;
        grid-template-columns: 0.5fr 2fr 2fr 0.5fr;
        grid-template-rows: 2fr 0.25fr;
        margin-top: 2vw
    }

    .favorite-container {
        display: flex;
        grid-column: 2/3;
        grid-row: 2/3;
        align-items: center;
        justify-content: center;
    }

    #is-favorite-button {
        border: none;
        border-radius: 4px;
        background: transparent;
        color: gold;
        font-size: 1.5rem;
    }

    #is-favorite-button:hover{
        cursor:pointer;
        background: rgb(32, 32, 32);
    }

    #is-non-favorite-button {
        border: none;
        border-radius: 4px;
        background: transparent;
        color: rgb(32, 32, 32);
        font-size: 1.5rem;
    }

    #is-non-favorite-button:hover {
        cursor:pointer;
        background: rgb(32, 32, 32);
        color:gold;
    }

    .burger-info {
        padding: 0.8vw;
    }

    .burger-image {
        grid-column: 2/3;
        text-align: center;
    }

    .burger-image > img {
        border: groove gold 4px;
        width: 20vw;
        margin-top: 3vw;
    }

    .burger-interaction {
        grid-column: 3/4;
        display: grid;
        grid-template-columns: 1fr 0.5fr;
        align-items: center;
    }
    

    #quantity-input {
        font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        width: 3rem;
    }

    #add-to-cart-btn {
        margin-left: 0.7vw;
        background-color: rgb(26, 101, 42);
        color: rgb(32, 32, 32);
        border-radius: 3px;
        width: 2rem;
        height: 1.5rem;
    }

    #add-to-cart-btn:hover{
        color: gold;
        border: solid 2px gold;
        background-color: rgb(255, 255, 255);
    }

    #add-to-cart-btn:active {
        transform: translate3d(-2px, -1.5px, -1px);
    }

    .dollar-green {
        color: rgb(26, 101, 42);
    }

    .warning {
        color: rgb(203, 5, 5);
    }

    .message-container {
        grid-column: 3 / 4;
        text-align: center;
        text-justify: center;
    }

    @media (max-width: 1000px) {
        .burger-image > img {
            border: groove gold 4px;
            width: 22vw;
            margin-top: 3vw;
        }

        .burger-interaction {
            grid-column: 3/4;
            display: grid;
            grid-template-columns: 1fr 0.5fr;
            align-items: center;
        }
        

        #quantity-input {
            font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            width: 2rem;
            text-align: center;
            text-justify: center;
        }

        #add-to-cart-btn {
            margin-left: 0.7vw;
            background-color: rgb(26, 101, 42);
            color: rgb(32, 32, 32);
            border-radius: 3px;
            width: 2rem;
        }
    }

    @media (max-width: 600px) {
        .burger-image > img {
            border: groove gold 4px;
            width: 28vw;
            margin-top: 3vw;
        }

        .burger-interaction {
            grid-column: 3/4;
            display: grid;
            grid-template-columns: 1fr 0.5fr;
            align-items: center;
        }
        

        #quantity-input {
            font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            width: 2rem;
            text-align: center;
            text-justify: center;
        }

        #add-to-cart-btn {
            margin-left: 0.7vw;
            background-color: rgb(26, 101, 42);
            color: rgb(32, 32, 32);
            border-radius: 3px;
            width: 2rem;
        }

    }
    
</style>