<script>
import { onMounted, ref, watch, getCurrentInstance } from 'vue';
import MenuItem from '../components/MenuItem.vue';
import {userService} from '../services/userServices';

export default {
        components: {
            MenuItem
        },
        setup() {

            const allProducts = ref([]);
            const allBurgers = ref([]);
            const allSides = ref([]);
            const allDrinks = ref([]);
            const filteredProducts = ref([]);

            const userIds = ref([])
            const isSignedInUser = ref(false);
            const signedInUser = ref({})

            const isShowingAllProducts = ref(true);
            const noProductsFound = ref(true);

            const instance = getCurrentInstance();


            onMounted(() => {
                fetch("http://localhost:7000/products")
                    .then(res => res.json())
                    .then(data => {
                        allProducts.value = data;
                    }).catch(err => console.log(err.message));
            });

            onMounted(() => {
                fetch('http://localhost:7001/users')
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(d => userIds.value.push(d.id));
                        })
            });

            watch(() => [...userIds.value], (currentValue) => {
                signedInUser.value = userService.isThereAUserSignedIn(currentValue)

                if(signedInUser.value !== null) {
                        signedInUser.value.favoriteProductsId.forEach(productId => {
                            allProducts.value.forEach(p => {
                                if(p.id === productId){
                                    p.isFavorite = true;
                                }
                            })
                        })
                }

                setSeparateLists(allProducts.value);

                instance.proxy.$forceUpdate();
            });

            watch(() => [...allProducts.value], () => {

                signedInUser.value = userService.isThereAUserSignedIn(userIds.value)
                
                if(signedInUser.value !== null && signedInUser.value.favoriteProductsId.length >= 1) {
                        signedInUser.value.favoriteProductsId.forEach(productId => {
                            allProducts.value.forEach(p => {
                                if(p.id === productId){
                                    p.isFavorite = true;
                                }
                            })
                        })
                }

                setSeparateLists(allProducts.value);

                instance.proxy.$forceUpdate();
            })

            const setSeparateLists = (products) => {
                allBurgers.value = products.filter(p => p.type === "burger");
                allSides.value = products.filter(p => p.type === "sides");
                allDrinks.value = products.filter(p => p.type === "drink");
            }


            const filterProductsList = (event) => {
                
                let searchTerm = event.target.value;

                filteredProducts.value = allProducts.value.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

                if(searchTerm.length < 1) {
                    isShowingAllProducts.value = true;
                } else if (searchTerm.length > 1 && filteredProducts.value.length === 0) {
                   isShowingAllProducts.value = false;
                   noProductsFound.value = true;

                } else {
                    isShowingAllProducts.value = false;
                    noProductsFound.value = false;
                }
            }

            return {allBurgers, allDrinks, allSides, filterProductsList, isShowingAllProducts, filteredProducts, noProductsFound, isSignedInUser}
    }
}
</script>

<template>
    <div class="search-bar">
        <input id="search-field" type="text" placeholder="Menu search" @input="$event => filterProductsList($event)">
    </div>
    <div v-if="isShowingAllProducts" class="menu-item-container">
        <h3 class="menu-header">Burgers:</h3>
        <MenuItem v-for="burger in allBurgers"  
            :key="burger.id"
            :name="burger.name"
            :type="burger.type"
            :id="burger.id" 
            :image="burger.image"
            :isFavorite="burger.isFavorite"  
            />
    </div>
    <div v-if="isShowingAllProducts" class="menu-item-container">
        <h3 class="menu-header">Sides:</h3>
        <MenuItem v-for="side in allSides"
            :key="side.id"
            :id="side.id"
            :name="side.name"
            :type="side.type"
            :image="side.image"
            :isFavorite="side.isFavorite"/>
        
    </div>
    <div v-if="isShowingAllProducts" class="menu-item-container">
        <h3 class="menu-header">Drinks:</h3>
        <MenuItem v-for="drink in allDrinks"
            :key="drink.id"
            :id="drink.id"
            :name="drink.name"
            :type="drink.type"
            :image="drink.image"
            :isFavorite="drink.isFavorite"/>

    </div>
        <div v-if="!isShowingAllProducts && !noProductsFound" class="menu-item-container">
            <h3 class="menu-header">Search result:</h3>
            <MenuItem v-for="product in filteredProducts"  
                :key="product.id"
                :name="product.name"
                :type="product.type"
                :id="product.id" 
                :image="product.image"  
                :isFavorite="product.isFavorite"
                />
        </div>
        <div v-else-if="!isShowingAllProducts && noProductsFound" class="no-search-result-container">
            <h3>No match in menu, please try different search word.</h3>
        </div>
</template>

<style scoped>

    .search-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem 1rem;
    }

    #search-field {
        border: solid gold 2px;
        height: 1.5rem;
        background-color: rgb(68, 68, 68);
        color: rgb(255, 255, 255)
    }



    .search-bar > input {
        width: 50%;
    }
    .menu-item-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
        padding: 10px;
        margin: 2rem 3rem;
        background-color: rgb(250, 250, 250);
    }

    .menu-header {
        text-align: center;
        grid-column: 1 / 3  ;
    }

    .no-search-result-container {
        margin: 4rem;
        color: red;
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 2vw;
        border: rgb(68, 68, 68) solid 2px;       
    }

    @media (max-width: 600px) {
        .menu-item-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
        padding: 10px;
        margin: 1rem 0.2rem;
        background-color: rgb(250, 250, 250);
    }
    }
</style>