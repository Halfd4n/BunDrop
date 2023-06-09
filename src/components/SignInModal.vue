<script>

import { userService } from '../services/userServices'
import {onMounted, ref} from 'vue';
    export default {
        setup(props, {emit}) {

            const username = ref('');
            const password = ref('');

            const isShowingErrorMessage = ref(false);
            const errorMessage = ref('');

            const isShowingSuccessMessage = ref(false);

            const allUsers = ref([]);

            onMounted(() => {
                fetch('http://localhost:7001/users')
                    .then(res => res.json())
                    .then(data => allUsers.value = data)
            });

            const closeModal = () => {
                emit('closeModal')
            }

            const signInUser = () => {

              let userToSignIn = allUsers.value.find(u => u.username === username.value);
              
              if(userToSignIn != undefined && userToSignIn.password === password.value) {
                
                isShowingErrorMessage.value = false;
                userService.signInUser(userToSignIn)
                
                isShowingSuccessMessage.value = true;

                emit('userSignedIn')
              
              } else {
                isShowingErrorMessage.value = true;
              }
            }

            const setRefValue = (event) => {

                let id = event.target.id;
                let input = event.target.value;

                switch(id) {
                    case "username":
                      username.value = input;
                      break;
                    case "password":
                      password.value = input;    
              }
            }

            return {closeModal, setRefValue, signInUser, errorMessage, isShowingErrorMessage, isShowingSuccessMessage}
        }
    }
</script>

<template>
    <div class="backdrop">
        <div class="sign-in-modal">
            <form v-if="!isShowingSuccessMessage">                            
                <input type="text" id="username" placeholder="Username" @input="$event => setRefValue($event)"/>
                <input type="password" id="password" placeholder="Password" @input="$event => setRefValue($event)" />
            </form>
            <div v-if="!isShowingSuccessMessage" class="btn-container">
                <button @click="closeModal">Cancel</button>
                <button @click="signInUser">Sign in</button>
            </div>
            <div v-if="isShowingErrorMessage && !isShowingSuccessMessage" class="error-message-container">
                <em>Username or password is incorrect, please try again!</em>
            </div>
            <div v-if="isShowingSuccessMessage" class="success-message-container">
                <em id="success-message">Successfully signed in!</em>
                <hr>
                <button @click="closeModal" id="close-btn">Close</button>
            </div>
        </div>

    </div>

</template>

<style>
    input {
        font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        margin-top: 1vw;
        text-align: center;
        border: solid rgb(68, 68, 68) 2px;
        border-radius: 4px;
        padding: 0.1rem;
    }

    form {
        display: grid;
        grid-template-columns: 1fr;
    }

    .sign-in-modal {
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
        background-color: rgba(0, 255, 238, 0.656);
        width: 50vw;
    }

    .backdrop {
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }

    .btn-container {
        margin: 1rem 0;
    }

    .btn-container > button {
        margin: 0 0.2rem;
        border: solid rgb(68, 68, 68) 2px;
        border-radius: 4px;
        background-color: rgb(68, 68, 68);
        color: rgb(255, 255, 255);
    }

    .btn-container > button:hover {
        color: gold;
        border-color: gold;
        cursor: pointer;
    }

    .success-message-conainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #success-message {
      color: rgb(39, 58, 43);
    }

    #close-btn {
        border:solid rgb(68, 68, 68) 2px;
        border-radius: 4px;
        color: rgb(255, 255, 255);
        background-color: rgb(68, 68, 68);
    }

    #close-btn:hover {
        border-color: gold;
        color: gold;
        cursor: pointer;
    }

    @media (max-width: 600px) {
    
        input {
            font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            margin-top: 1vw;
            text-align: center;
            border: solid rgb(68, 68, 68) 2px;
            border-radius: 4px;
            padding: 0.1rem;
        }

        form {
            display: grid;
            grid-template-columns: 1fr;
        }

        .register-modal {
            padding: 5vw;
            margin: 8rem auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            padding: 2vw;
            left: 20%;
            border: rgb(68, 68, 68) solid 2px;
            border-radius: 10px;
            background-color: rgba(0, 255, 238, 0.4);
            width: 50vw;
        }

        .backdrop {
            top: 0;
            left: 0;
            position: fixed;
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
        }

        .btn-container {
            margin: 1rem 0;
        }

        .btn-container > button {
            margin: 0 0.2rem;
            border: solid rgb(68, 68, 68) 2px;
            border-radius: 4px;
            background-color: rgb(68, 68, 68);
            color: rgb(255, 255, 255);
        }

        .btn-container > button:hover {
            color: gold;
            border-color: gold;
            cursor: pointer;
        }

        .error-message-container {
            font-size: 1rem;
        }

        .success-message-conainer {
            font-size: 1rem;
        }
    }
</style>