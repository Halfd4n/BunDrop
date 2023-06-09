<script>
import { ref } from 'vue';

export default {
    props: ['name', 'image', 'id', 'type', 'isFavorite'],
    setup(props) {
        const isLinkHovered = ref(false)

        const linkIsHovered = () => {            
            isLinkHovered.value = true;
        }

        const linkIsNotHovered = () => {
            isLinkHovered.value = false;
        }

        return {linkIsHovered, linkIsNotHovered, isLinkHovered}
    },

}

</script>

<template>
    <router-link v-if="type === 'burger'" :to="{name: 'Product', params: { type: `${type}`, id: `${id}`}}" @mouseover="linkIsHovered" @mouseleave="linkIsNotHovered">
        <div class="menu-item-card">
            <div>
                <img :src="image" alt="Burger image" />
                <h4 v-if="isLinkHovered">{{ name }} <font-awesome-icon icon="fa-solid fa-burger" bounce /></h4>
                <h4 v-else>{{ name }} <font-awesome-icon icon="fa-solid fa-burger" /></h4>
            </div>
            <div class="favorite-icon-container">
                <font-awesome-icon class="non-favorite" v-if="!isFavorite" icon="fa-regular fa-star" />
                <font-awesome-icon class="favorite" v-else icon="fa-solid fa-star" />
            </div>
        </div>
    </router-link>

    <router-link v-if="type === 'sides'" :to="{name: 'Product', params: { type: `${type}`, id: `${id}`}}" @mouseover="linkIsHovered" @mouseleave="linkIsNotHovered">
        <div class="menu-item-card">
            <div>
                <img :src="image" alt="Sides image" />
                <h4 v-if="isLinkHovered">{{ name }} <font-awesome-icon icon="fa-solid fa-bowl-food" bounce/></h4>
                <h4 v-else>{{ name }} <font-awesome-icon icon="fa-solid fa-bowl-food" /></h4>
            </div>
            <div class="favorite-icon-container">
                <font-awesome-icon class="non-favorite" v-if="!isFavorite" icon="fa-regular fa-star" />
                <font-awesome-icon class="favorite" v-else icon="fa-solid fa-star" />
            </div>
        </div>
    </router-link>

    <router-link v-if="type === 'drink'" :to="{name: 'Product', params: { type: `${type}`, id: `${id}`}}" @mouseover="linkIsHovered" @mouseleave="linkIsNotHovered">
        <div class="menu-item-card">
            <div>
                <img :src="image" alt="Drinks image">
                <h4 v-if="isLinkHovered">{{ name }} <font-awesome-icon icon="fa-solid fa-glass-water" bounce /></h4>
                <h4 v-else>{{ name }} <font-awesome-icon icon="fa-solid fa-glass-water" /></h4>
            </div>
           <div class="favorite-icon-container">
                <font-awesome-icon class="non-favorite" v-if="!isFavorite" icon="fa-regular fa-star" />
                <font-awesome-icon class="favorite" v-else icon="fa-solid fa-star" />
            </div>
        </div>
    </router-link>
</template>

<style scoped>
    .menu-item-card {
        display: grid;
        grid-template-columns: 2fr 0.25fr;
        border: solid rgb(33, 33, 33) 2px;
        border-radius: 4px;
        padding: 1rem;
        text-align: center;
        height: 13rem;
        background-color: rgba(0, 255, 255, 0.066);
    }

    h4 {
        color: rgb(33, 33, 33);
    }

    a {
        text-decoration: none;
    }

    div > img {
        width: 8rem;
        border: groove gold 4px
    }

    .router-link:hover {
        cursor: pointer;
    }

    .favorite{
        font-size: 1.2rem;
        color: gold;
    }

    .non-favorite {
        font-size: 1.2rem;
        color: rgb(68,68,68);
    }
    

</style>