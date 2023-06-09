<script>
import { userService } from '../services/userServices'
import {onMounted, ref} from 'vue';
    export default {
        setup(props, {emit}) {

            const username = ref('');
            const password = ref('');

            const isShowingErrorMessage = ref(false);
            const errorMessage = ref('');

            const isUsernameValidated = ref(false);
            const isPasswordValidatet = ref(false);
            const isRepeatedPasswordValidated = ref(false);

            const isShowingSuccessMessage = ref(false);

            const usernameAndPasswordValidator = /^[A-Z0-9]+$/i

            const allUsers = ref([]);

            onMounted(() => {
                fetch('http://localhost:7001/users')
                    .then(res => res.json())
                    .then(data => allUsers.value = data)
            });

            const closeModal = () => {
                emit('closeModal')
            }

            const registerUser = () => {

                let result = finalCheck();

                if(result) {
                    
                    userService.registerUser(username.value, password.value);
                    isShowingSuccessMessage.value = true;
                    isShowingErrorMessage.value = false;

                    username.value = '';
                    password.value = '';

                    
                } else {
                    isShowingErrorMessage.value = true;
                    errorMessage.value = "Something went wrong, please check your inputs again"
                }
            }

            const finalCheck = () => {
                if(isPasswordValidatet.value && isUsernameValidated.value && isRepeatedPasswordValidated.value) {
                    return true;
                } else {
                    return false;
                }
            }

            const validateInput = (event) => {

                let id = event.target.id;
                let input = event.target.value;


                switch(id) {
                    case "username":
                        
                        let isValidUserName = usernameAndPasswordValidator.test(input)

                        if(isValidUserName && input.length >= 4) {
                            
                            let result = userService.isUsernameTaken(input, allUsers.value)

                            if(!result) {
                                isShowingErrorMessage.value = false;
                                isUsernameValidated.value = true;
                                username.value = input;
                            } else {
                                isShowingErrorMessage.value = true;
                                isUsernameValidated.value = false;
                                errorMessage.value = "Username is already taken"; 
                            }

                        } else {
                            isShowingErrorMessage.value = true;
                            isUsernameValidated.value = false;
                            errorMessage.value = "Username must be at least 4 characters and may contain letters and digits";
                        }

                        break;
                    
                    case "password":

                        let isValidPassword = usernameAndPasswordValidator.test(input);

                        if(isValidPassword && input.length >= 6){
                            isPasswordValidatet.value = true;
                            isShowingErrorMessage.value = false;
                            password.value = input;
                        } else {
                            isPasswordValidatet.value = false;
                            isShowingErrorMessage.value = true;
                            errorMessage.value = "Password must be at least 6 characters and may contain letters and digits";
                        }

                        break;
                    
                    case "repeat-password": {
                        let isValidPassword = usernameAndPasswordValidator.test(input);

                        if(isValidPassword && input === password.value) {
                            isShowingErrorMessage.value = false;
                            isRepeatedPasswordValidated.value = true;
                        } else {
                            isShowingErrorMessage.value = true;
                            isRepeatedPasswordValidated.value = false;

                            errorMessage.value = "The passwords doesn't match";
                        }
                    }

                }
                
            }

            return {closeModal, registerUser, validateInput, errorMessage, isShowingErrorMessage, isShowingSuccessMessage}
        }
    }
</script>

<template>
    <div class="backdrop">
        <div class="register-modal">
            <h4>Register:</h4>
            <form v-if="!isShowingSuccessMessage">                            
                <input type="text" id="username" placeholder="Username" @input="$event => validateInput($event)"/>

                <input type="password" id="password" placeholder="Password" @input="$event => validateInput($event)" />

                <input type="password" id="repeat-password" placeholder="Repeat password" @input="$event => validateInput($event)" />
            </form>
            <div v-if="!isShowingSuccessMessage" class="btn-container">
                <button @click="closeModal">Cancel</button>
                <button @click="registerUser">Register</button>
            </div>
            <div v-if="isShowingErrorMessage && !isShowingSuccessMessage" class="error-message-container">
                <em>{{ errorMessage }}</em>
            </div>
            <div v-if="isShowingSuccessMessage" class="success-message-container">
                <em>Successfully registered!</em>
                <hr>
                <button @click="closeModal" id="return-home-btn" >Return to home</button>
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

    .register-modal {
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

    .success-message-conainer {
        color: rgb(26, 101, 42);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #return-home-btn {
        border:solid rgb(68, 68, 68) 2px;
        border-radius: 4px;
        color: rgb(255, 255, 255);
        background-color: rgb(68, 68, 68);
    }

    #return-home-btn:hover {
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