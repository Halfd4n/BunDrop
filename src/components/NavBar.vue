<script>
import {onMounted, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import { userService } from '../services/userServices'
import SignInModal from '../components/SignInModal.vue'
    export default {
        components: {
            SignInModal
        },
        setup() {
            
            const router = useRouter();

            const userIds = ref([])
            const isSignedInUser = ref(false)
            const isShowingSignInModal = ref(false);

        
            onMounted(() => {
                fetch('http://localhost:7001/users')
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(d => userIds.value.push(d.id))
                    })
            })

            watch(() => [...userIds.value], (currentValue) => {
                
                let result = userService.isThereAUserSignedIn(currentValue)

                if(result !== null) {
                    isSignedInUser.value = true;
                }
            });

            const openSignInModal = () => {
                isShowingSignInModal.value = true;
            }

            const signOut = () => {
                isSignedInUser.value = false;
                userService.signOutUser();

                router.push("/");
            }

            const closeModal = () => {
                isShowingSignInModal.value = false;
            }

            const successfulSignIn = () => {
                isSignedInUser.value = true;
            }

            return { isSignedInUser, openSignInModal, signOut, isShowingSignInModal, closeModal, successfulSignIn};
        }
    }
</script>

<template>
    <SignInModal v-if="isShowingSignInModal" @closeModal="closeModal" @userSignedIn="successfulSignIn"/>
    <div class="navbar-container">
        <div class="logo-container">
            <div id="logo">
                <router-link :to="{name: 'Home'}">
                    <img src="/images/logo black text-white.png" alt="Company logo" id="logo">
                </router-link>
            </div>
            <div class="brick-container">
                <div class="brick dark"></div>
                <div class="brick bright"></div>
                <div class="brick"></div>
                <div class="brick dark"></div>
                <div class="brick"></div>
            </div>
            <div class="brick-container">
                <div class="brick bright"></div>
                <div class="brick"></div>
                <div class="brick dark"></div>
                <div class="brick"></div>
                <div class="brick"></div>
            </div>
            <div class="brick-container">
                <div class="brick"></div>
                <div class="brick dark"></div>
                <div class="brick"></div>
                <div class="brick"></div>
            </div>
            <div class="brick-container">
                <div class="brick dark"></div>
                <div class="brick"></div>
                <div class="brick"></div>
                <div class="brick dark"></div>
                <div class="brick bright"></div>
            </div>
                <div class="brick-container">
                <div class="brick dark"></div>
                <div class="brick"></div>
                <div class="brick"></div>
                <div class="brick dark"></div>
                <div class="brick bright"></div>
            </div>
        </div>
        <div class="menu-container">
            <div class="menu-item">
                <router-link :to="{ name: 'Home'}">
                    <font-awesome-icon icon="fa-solid fa-house-chimney" />
                </router-link>
            </div>
            <div class="menu-item">
                <router-link :to="{ name: 'Menu'}">
                    <font-awesome-icon icon="fa-solid fa-burger" />
                </router-link>
            </div>
            <div class="menu-item">
                <router-link :to="{ name: 'Shoppingcart'}">
                    <font-awesome-icon icon="fa-solid fa-basket-shopping" />
                </router-link>
            </div>
            <div class="menu-item">
                <router-link :to="{ name: 'Checkout'}">
                    <font-awesome-icon icon="fa-solid fa-cash-register" />
                </router-link>
            </div>
        </div>
            <div v-if="!isSignedInUser" id="user-btn-container">
                <button id="user-btn" style="background-color: rgb(255, 106, 106);;" @click="openSignInModal"><font-awesome-icon icon="fa-solid fa-circle-user" /></button>
            </div>
            <div v-else id="user-btn-container">
                <button id="user-btn" style="background-color: rgb(129, 245, 129);;" @click="signOut"><font-awesome-icon icon="fa-solid fa-circle-user" /></button>
            </div>
    </div>
</template>

<style scoped>

    .navbar-container {
        background-color: rgb(66, 66, 66);
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        opacity: 0.9;
        border-bottom: solid rgb(33, 33, 33) 2px;
    }

    .brick-container {
        display:flex;
    }

    .brick{
        background: rgb(160,54,35);
        border: solid rgb(33, 33, 33) 1px;
        border-radius: 2px;
        width: 5.5vw;
        height: 1.5vw;
        margin: 0.2vw;
        box-shadow: rgb(68, 68, 68) 1px 1px 1px ;
    }

    .dark {
        background: rgb(119, 36, 25);
    }

    .bright {
        background:  rgb(191, 71, 50);

    }

    #logo {
        height: 10vw;
        position: absolute;
        left: 3%;
        top: 0%;
    }
    div.logo-container > div:nth-child(3) > div:nth-child(1) {
        width: 2.6vw;
    }
    div.logo-container > div:nth-child(5) > div:nth-child(1) {
        width: 2.6vw;
    }

    .menu-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        position: relative;
        right: 5%;
        gap: 1vw;
    }


    .menu-item > a {
        font-size: 3vw;
        padding: 1vw;
        color: rgb(32, 32, 32);
        background-color: rgb(68, 68, 68);
        border-bottom: solid rgb(33, 33, 33) 2px;
        border-left: solid rgb(33, 33, 33) 2px;
        border-right: solid rgb(33, 33, 33) 2px;
        border-radius: 4px;
    }

    .menu-item > a:hover {
        cursor: pointer;
        background-color: rgb(250, 250, 250);
        color: gold;
        border: rgb(255, 255, 255)
    }

    a.router-link-exact-active {
        background-color: rgb(255, 255, 153);
        box-shadow: 1px 1px 2px rgb(33, 33, 33);        
    }

    #user-btn-container {
        position: absolute;
        top: 5%;
        right: 1%;
    }

    #user-btn {
        border-radius: 20px;
        height: 1.5rem;
        width: 1.5rem;
        font-size: 0.6rem;
        text-align: center;
        text-justify: center;
    }

    #user-btn:hover{
        border-color: gold;
        color:gold;
    }


    
    @media (max-width: 768px) {        
        .menu-container {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            position: relative;
            gap: 1vw;
        }

        
        #logo {
            height: 4.0rem;
            position: absolute;
            left: 3%;
            top: 0%;
        }

        .menu-item > a {
            font-size: 2.8vw;
            padding: 1vw;
            color: rgb(32, 32, 32);
            background-color: rgb(68, 68, 68);
            border-bottom: solid rgb(33, 33, 33) 2px;
            border-left: solid rgb(33, 33, 33) 2px;
            border-right: solid rgb(33, 33, 33) 2px;
            border-radius: 4px;
            }

        a.router-link-exact-active {
            background-color: rgb(255, 255, 153);
            box-shadow: 1px 1px 2px rgb(33, 33, 33);
        }

        #user-btn-container {
            position: absolute;
            top: 5%;
            right: 1%;
        }

        #user-btn {
            border-radius: 20px;
            height: 1.5rem;
            width: 1.5rem;
            font-size: 0.6rem;
            text-align: center;
            text-justify: center;
        }
    }

    @media (max-width: 600px) {
        #logo {
            height: 3.1rem;
        }

        
        #user-btn-container {
            position: absolute;
            top: 5%;
            right: 1%;
        }

        #user-btn {
            border-radius: 20px;
            height: 1.5rem;
            width: 1.5rem;
            font-size: 0.6rem;
            text-align: center;
            text-justify: center;
        }

        .menu-container {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            position: absolute;
            top: 0;  
            gap: 0.2rem;
        }
        .menu-item > a {
            font-size: 0.8rem;
            padding: 0.3rem;
            background-color: rgb(68, 68, 68);
            border-bottom: solid rgb(33, 33, 33) 2px;
            border-left: solid rgb(33, 33, 33) 2px;
            border-right: solid rgb(33, 33, 33) 2px;
            border-radius: 4px;
            }

        a.router-link-exact-active {
            background-color: rgb(255, 255, 153);
            box-shadow: 1px 1px 2px rgb(33, 33, 33);
        }
    }

    @media (max-width: 450px) {

        #logo {
            height: 2.8rem;
            position: absolute;
            left: 3%;
            top: 0%;
        }

        #user-btn-container {
            position: absolute;
            top: 5%;
            right: 1%;
        }

        #user-btn {
            border-radius: 20px;
            height: 1.5rem;
            width: 1.5rem;
            font-size: 0.6rem;
            text-align: center;
            text-justify: center;
        }

        .menu-container {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            position: absolute;
            top: 0;  
            gap: 0.2rem;
        }
        .menu-item > a {
            font-size: 0.8rem;
            padding: 0.3rem;
            background-color: rgb(68, 68, 68);
            border-bottom: solid rgb(33, 33, 33) 2px;
            border-left: solid rgb(33, 33, 33) 2px;
            border-right: solid rgb(33, 33, 33) 2px;
            border-radius: 4px;
            }

        a.router-link-exact-active {
            background-color: rgb(255, 255, 153);
            box-shadow: 1px 1px 2px rgb(33, 33, 33);
        }
    }

</style>

