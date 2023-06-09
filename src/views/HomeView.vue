<script>
import RegisterFormModal from '../components/RegisterFormModal.vue';
import SignInModal from '../components/SignInModal.vue';
import {ref, onMounted, watch} from 'vue'
import { userService } from '../services/userServices';
export default {
  components: {
    RegisterFormModal,
    SignInModal
  },
  setup() {

    const isShowingRegisterForm = ref(false);
    const isShowingSignInModal = ref(false);
    const userIds = ref([]);
    const isSignedInUser = ref(false);

    onMounted(() => {
    fetch('http://localhost:7001/users')
        .then(res => res.json())
        .then(data => {
            data.forEach(d => userIds.value.push(d.id))
        })
    })

    watch(() => [...userIds.value], (currentValue) => {
        
        isSignedInUser.value = userService.isThereAUserSignedIn(currentValue)
    });

    const openRegisterForm = () => {
      isShowingRegisterForm.value = true;
    };
    const closeRegisterModal = () => {
      isShowingRegisterForm.value = false;
    };

    const openSignInModal = () => {
      isShowingSignInModal.value = true;
    }

    const closeSignInModal = () => {
      isShowingSignInModal.value = false;
    }

    const signInUser = () => {
      isSignedInUser.value = true;
    }

    const signOutUser = () => {
      userService.signOutUser();
      isSignedInUser.value = false;
    }

    return {openRegisterForm, isShowingRegisterForm, isSignedInUser, closeRegisterModal, closeSignInModal, openSignInModal, isShowingSignInModal, signInUser, signOutUser}
  }
}
</script>

<template>
  <RegisterFormModal v-if="isShowingRegisterForm" @closeModal="closeRegisterModal"/>
  <SignInModal v-if="isShowingSignInModal && !isShowingRegisterForm" @closeModal="closeSignInModal" @userSignedIn="signInUser"/>
  <div v-if="!isShowingRegisterForm && !isShowingSignInModal" class="main-container">
    <h2>Welcome to Bun Drop</h2>
    <hr style="width: 20vw;">
    <h5>With us, a burger is never far away and we will always.. Drop it like it's hot</h5>
      <div class="choice-container">
        <router-link :to="{name: 'Menu'}"><button>Take me to the menu</button></router-link>
        <button v-if="!isSignedInUser" @click="openSignInModal">Sign in</button>
        <button v-else @click="signOutUser">Sign out</button>
      </div>
    <h5>Not a member yet? Click <button id="register-button" @click="openRegisterForm">here</button> to register!</h5>
  </div>
</template>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .choice-container {
    margin-top: 2vw;
    border: solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2vw;
    background-color: rgba(0, 255, 255, 0.066);
    border-radius: 4px;
    }

    .choice-container > button {
      margin: 1rem;
      background-color: rgb(68,68,68);
      border: solid 2.5px rgb(255, 255, 255);
      border-radius: 4px;
      font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      color: rgb(255, 255, 255);
      padding: 0.3rem;
    }
    
    .choice-container > button:hover {
      border-color: gold;
      color: gold;
    }
    
    .choice-container > a > button {
      margin: 1rem;
      background-color: rgb(68,68,68);
      border: solid 2px rgb(255, 255, 255);
      border-radius: 2px;
      font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      color: rgb(255, 255, 255);
      padding: 0.3rem;
    }

    .choice-container > a > button:hover {
      border-color: gold;
      color: gold;
    }

    #register-button {
      border: none;
      background-color: transparent;
      text-decoration: underline;
    }

    #register-button:hover {
      background-color: rgb(68,68,68);
      color: gold;
      cursor: pointer;
      border-radius: 2px;
    }
</style>
