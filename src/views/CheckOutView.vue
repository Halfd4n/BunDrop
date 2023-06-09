<script>
import { onMounted, ref, watch } from 'vue';
import { orderService } from '../services/orderServices';
import CustomerInfo from '../components/CustomerInfo.vue';
import PurchaseCompleteModal from '../components/PurchaseCompleteModal.vue';
import EmptyShoppingCart from '../components/EmptyShoppingCart.vue'

    export default {
        components: {
            EmptyShoppingCart,
            CustomerInfo,
            PurchaseCompleteModal,
        },
        setup() {

            const order = ref([]);
            const totalCosts = ref(0);
            const isModalShowing = ref(false);
            const isShoppingCartEmpty = ref(true)

            const customerInfoError = ref('');
            const isShowingCustomerInfoError = ref(false);

            const isCreditCardPaymentMethod = ref(true);
            const paymentErrorMessage = ref('');
            const isShowingPaymentErrorMessage = ref(false);


            onMounted(() => {
                order.value = orderService.getShoppingCartContent();

                if(order.value !== null) {
                    order.value.forEach(p => {
                    totalCosts.value += (p.quantity * p.price);
                    isShoppingCartEmpty.value = false;
                    })
                }

            })

  
            const monthRef = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
            const yearRef = ref(['23', '24', '25', '26', '27', '28', '29'])

            watch(isCreditCardPaymentMethod, () => {
                paymentErrorMessage.value = '';
                isShowingPaymentErrorMessage.value = false;
                isShowingCustomerInfoError.value = false;
            })

            const customerInfo = ref({
                firstname: '',
                lastname: '',
                email: '',
                phoneNumber: '',
                streetAddress: '',
                postalCode: '',
                city: ''
            });

            const cardInformation = ref({
                cardNumber: 0,
                ccv: 0,
                expMonth: 1,
                expYear: 23
            });

            const swishInformation = ref('')

            const customerInfoCheckList = ref({
                isFirstnameValidated : false,
                isLastnameValidated : false,
                isEmailValidated : false,
                isPhoneNumberValidated : false,
                isStreetAddressValidated : false,
                isPostalCodeValidated : false,
                isCityValidated : false,
                isCreditNumberValid : false,
                isCcvValid : false,
                isSwishNumberValid : false
            });



            const numberValidator = new RegExp('^[0-9]+$');
            const removeWhitespace = new RegExp('\\s', 'g');
            const alphabeticsValidator = /^[A-Z]+$/i
            const emailValidator = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
            const streetAddressValidator = /^[a-zA-Z]+\s[0-9]+$/

            const validateCustomerInput = (id, value) => {
                
                
                switch(id){
                    case "firstname":

                        let isOnlyLettersInFirstname = alphabeticsValidator.test(value)

                        if(value.length >= 2 && isOnlyLettersInFirstname){
                            customerInfo.value.firstname = value;
                            isShowingCustomerInfoError.value = false;
                            customerInfoCheckList.value.isFirstnameValidated = true;
                        } else {
                            isShowingCustomerInfoError.value = true;
                            customerInfoError.value = "Please input firstname";
                            customerInfoCheckList.value.isFirstnameValidated = false;
                        }
                    
                        break;

                    case "lastname":
                        
                        let isOnlyLettersInLastname = alphabeticsValidator.test(value)

                        if(value.length >= 2 && isOnlyLettersInLastname){
                            customerInfo.value.lastname = value;
                            isShowingCustomerInfoError.value = false;
                            customerInfoCheckList.value.isLastnameValidated = true;
                        } else {
                            isShowingCustomerInfoError.value = true;
                            customerInfoError.value = "Please input lastname";
                            customerInfoCheckList.value.isLastnameValidated = false;
                        }
                        break;

                    case "email":

                        let isValidEmailFormat = emailValidator.test(value);

                        if(isValidEmailFormat) {
                            customerInfo.value.email = value;
                            isShowingCustomerInfoError.value = false;
                            customerInfoCheckList.value.isEmailValidated = true;
                        } else {
                            customerInfoError.value = "Please input valid email-address"
                            isShowingCustomerInfoError.value = true;
                            customerInfoCheckList.value.isEmailValidated = false;
                        }

                        break;

                    case "phone-number":
                        
                        let valueWithNoWhiteSpace = value.replace(removeWhitespace, '');
            
                        let isValidPhoneNumber = numberValidator.test(valueWithNoWhiteSpace);
                        
                        if(isValidPhoneNumber && valueWithNoWhiteSpace.length === 10) {
                            customerInfo.value.phoneNumber = value;
                            isShowingCustomerInfoError.value = false;
                            customerInfoCheckList.value.isPhoneNumberValidated = true;
                        } else {
                            customerInfoError.value = "Please input valid phone number"
                            isShowingCustomerInfoError.value = true;
                            customerInfoCheckList.value.isPhoneNumberValidated = false;
                        }
                        
                        break;
                    case "streetaddress":
                        let isValidStreetAddress = streetAddressValidator.test(value)

                        if(isValidStreetAddress) {
                            customerInfo.value.streetAddress = value;
                            isShowingCustomerInfoError.value = false;
                            customerInfoCheckList.value.isStreetAddressValidated = true;
                        } else {
                            customerInfoError.value = "Please input valid street address"
                            isShowingCustomerInfoError.value = true;
                            customerInfoCheckList.value.isStreetAddressValidated = false;
                        }

                        break;
                    case "postalcode":
                        
                        let isValidPostalCode = numberValidator.test(value)

                        let postalCodeRemovedWhitespace = value.replace(removeWhitespace, '');
                        
                        if(isValidPostalCode && postalCodeRemovedWhitespace.length === 5) {
                            customerInfo.value.postalCode = postalCodeRemovedWhitespace;
                            isShowingCustomerInfoError.value = false;
                            customerInfoCheckList.value.isPostalCodeValidated = true;
                        } else {
                            customerInfoError.value = "Please input valid postal code";
                            isShowingCustomerInfoError.value = true;
                            customerInfoCheckList.value.isPostalCodeValidated = false;
                        }

                        break;
                    case "city":
                        
                        let isValidCity = alphabeticsValidator.test(value);

                        if(isValidCity && value.length > 3) {
                            customerInfo.value.city = value;
                            isShowingCustomerInfoError.value = false;
                            customerInfoCheckList.value.isCityValidated = true;
                        } else {
                            customerInfoError.value = "Please input valid city name"
                            isShowingCustomerInfoError.value = true;
                            customerInfoCheckList.value.isCityValidated = false;
                        }

                        break;
                }
            }

            const checkSwishNumberValidity = (value) => {
    
                let valueWithNoWhiteSpace = value.replace(removeWhitespace, '');
                
                let result = numberValidator.test(valueWithNoWhiteSpace);

                if(result && valueWithNoWhiteSpace.length === 10) {

                    swishInformation.value = value;
                    isShowingPaymentErrorMessage.value = false;
                    customerInfoCheckList.value.isSwishNumberValid = true;

                } else {
                    isShowingPaymentErrorMessage.value = true;
                    customerInfoCheckList.value.isSwishNumberValid = false;
                    paymentErrorMessage.value = "Wrong number format! Input 10 characters and use digits only."
                }
            }

            const validateCreditCard = (event) => {
                
                let id = event.target.id;
                let value = event.target.value;

                switch(id) {
                    case "number-input":

                        let valueWithoutWhiteSpace = value.replace(removeWhitespace, '');
                        
                        let isOnlyDigits = numberValidator.test(valueWithoutWhiteSpace)


                        if(isOnlyDigits && valueWithoutWhiteSpace.length === 16){
                            isShowingPaymentErrorMessage.value = false;
                            cardInformation.value.cardNumber = valueWithoutWhiteSpace;
                            customerInfoCheckList.value.isCreditNumberValid = true;

                        } else {
                            isShowingPaymentErrorMessage.value = true;
                            paymentErrorMessage.value = "Invalid card number";
                            customerInfoCheckList.value.isCreditNumberValid = false;
                        }

                        break;
                    case "ccv-input":
                        let valueWithNoWhiteSpace = value.replace(removeWhitespace, '');
                        
                        let ccviSOnlyDigits = numberValidator.test(valueWithNoWhiteSpace);

                        if(ccviSOnlyDigits && valueWithNoWhiteSpace.length === 3) {
                            isShowingPaymentErrorMessage.value = false;
                            cardInformation.value.ccv = valueWithNoWhiteSpace;
                            customerInfoCheckList.value.isCcvValid = true;
                        } else {
                            isShowingPaymentErrorMessage.value = true;
                            paymentErrorMessage.value = "Invalid CCV code"
                            customerInfoCheckList.value.isCcvValid = false;
                        }

                        break;

                    case "month-select":
                        
                        cardInformation.value.expMonth = value;
                        break;

                    case "year-select": 

                        cardInformation.value.expYear = value;
                        break;
                }
            }

            const finalCheck = () => {
                if(isCreditCardPaymentMethod.value === true) {

                    if(customerInfoCheckList.value.isFirstnameValidated &&
                        customerInfoCheckList.value.isLastnameValidated &&
                        customerInfoCheckList.value.isPhoneNumberValidated &&
                        customerInfoCheckList.value.isEmailValidated &&
                        customerInfoCheckList.value.isStreetAddressValidated &&
                        customerInfoCheckList.value.isPostalCodeValidated &&
                        customerInfoCheckList.value.isCityValidated &&
                        customerInfoCheckList.value.isCreditNumberValid &&
                        customerInfoCheckList.value.isCcvValid) {
                            return true;
                        } else {
                            return false;
                        }
                } else {
                    if(customerInfoCheckList.value.isFirstnameValidated &&
                        customerInfoCheckList.value.isLastnameValidated &&
                        customerInfoCheckList.value.isPhoneNumberValidated &&
                        customerInfoCheckList.value.isEmailValidated &&
                        customerInfoCheckList.value.isStreetAddressValidated &&
                        customerInfoCheckList.value.isPostalCodeValidated &&
                        customerInfoCheckList.value.isCityValidated &&
                        customerInfoCheckList.value.isSwishNumberValid) {
                            return true;
                        } else {
                            return false;
                        }
                }
            }

            const placeOrder = () => {

                
                let result = finalCheck()

                if(result) {
                    isShowingCustomerInfoError.value = false;
         
                    orderService.placeOrder(totalCosts.value);

                    isModalShowing.value = true;  

                } else {
                    customerInfoError.value = "Something went wrong. Please check so that all information is filled correctly";
                    isShowingCustomerInfoError.value = true;
                }

            }

            return{isShoppingCartEmpty, validateCustomerInput, customerInfoError, isShowingCustomerInfoError, totalCosts, isCreditCardPaymentMethod, validateCreditCard, checkSwishNumberValidity, isShowingPaymentErrorMessage, paymentErrorMessage, placeOrder, monthRef, yearRef, placeOrder, isModalShowing};
        }
    }
</script>

<template>
    <div v-if="isShoppingCartEmpty">
        <EmptyShoppingCart />
    </div>
    
    <div v-else>
         <PurchaseCompleteModal v-if="isModalShowing" @closeModal="isModalShowing.value = false"/>
    <div class="customer-info-container">
        <h3>Customer information:</h3>
        <CustomerInfo 
            @validateCustomerInput="validateCustomerInput"
            />
    </div>
    <div class="error-message-container">
        <em v-if="isShowingCustomerInfoError">{{ customerInfoError }}</em>
    </div>
    <div v-if="!isModalShowing" class="payment-container">
        <div id="header">
            <h2>Checkout</h2>
        </div>
        <div id="payment-method">
            <h4 style="margin-right: 4px;"></h4> <span style="margin-right: 3px">Swish</span><label class="switch"><input v-model="isCreditCardPaymentMethod" type="checkbox"/><span class="slider"></span></label><span style="margin-left: 3px;">Credit card</span>
        </div>

        <div v-if="isCreditCardPaymentMethod" class="credit-container">
            <div class="payment-header">
                <h2>Credit card <font-awesome-icon icon="fa-brands fa-cc-mastercard" style="color" /></h2>
            </div>
            <div class="cardnumber-input-container">
                <label for="number-input" style="margin-right: 4px; font-weight: bold;">Card number:</label><input id="number-input" type="text" @input="$event => validateCreditCard($event)" title="Input your 16 digit credit card number">
            </div>
            <div class="ccv-input-container">
                <label for="ccv-input" style="margin-right: 4px; font-weight: bold;">CCV:</label><input id="ccv-input" type="text" @input="$event => validateCreditCard($event)" title="Input your 3 digit CCV-code">
            </div>
            <div class="expiration-date-container">
                <label style="margin-right: 10px; font-weight: bold;">Exp. date:</label>
                <label for="month-select" style="margin-right: 4px;">Month</label>
                <select id="month-select" @change="$event => validateCreditCard($event)">
                    <option v-for="month in monthRef" :key="month">{{ month }}</option>
                </select>
                <label for="year-select" style="margin-right: 4px;">Year</label>
                <select id="year-select" @change="$event => validateCreditCard($event)">
                    <option v-for="year in yearRef" :key="year">{{ year }}</option>
                </select>
            </div>
            <div id="total-cost">
                <h3><font-awesome-icon icon="fa-solid fa-dollar" /> {{ totalCosts.toFixed(2) }}</h3>
            </div>
            <div class="send-request-container">
                <button id="place-order-btn" @click="placeOrder">Commit purchase</button>
            </div>
            <div class="card-error-message">
                <em v-if="isShowingPaymentErrorMessage">{{ paymentErrorMessage }}</em>
            </div>
        </div>
        <div v-else class="swish-container">
            <div class="payment-header">
                <img src="images/swish-logo.png"/>
                <h2>Swish</h2>
            </div>
            <div class="input-container">
                <label style="margin-right: 1vw;" for="swish-number">Phone number:</label>
                <input id="swish-number" @input="$event => checkSwishNumberValidity($event.target.value)" type="text" />
            </div>
            <div class="button-container">
                <button @click="placeOrder">Send request</button>
            </div>
            <div class="error-message">
                <em v-if="isShowingPaymentErrorMessage">{{ paymentErrorMessage }}</em>
            </div>
            <div id="total-cost">
                <h3><font-awesome-icon icon="fa-solid fa-dollar" /> {{ totalCosts.toFixed(2) }}</h3>
            </div>
        </div>
    </div>
    </div>
   
</template>

<style>

    .customer-info-container {
        display: flex;
        justify-content: center;
    }

    .customer-info-container > h3 {
        margin-right: 2vw;
    }

    .error-message-container {
        display: flex;
        justify-content: center;
        color: red
    }

    .payment-container {
        display: grid;
        grid-template-columns: 0.25fr 0.75fr 0.75fr 0.25fr;
        grid-template-rows: 0.75fr 1fr 1fr;
    }

    #header {
        grid-column: 2/2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #payment-method {
        display: flex;
        align-items: center;
    }
    

    .switch {
        position: relative;
        display: inline-block;
        width: 4vw;
        height: 2vw;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgb(68, 68, 68);
        -webkit-transition: 0.5s;
        transition: 0.5s;
        border-radius: 20px;
    }

    .slider:before{
        position: absolute;
        content: "";
        height: 1.5vw;
        width: 1.5vw;
        left: 0.3vw;
        bottom: 0.28vw;
        background-image: linear-gradient(0.25turn, rgb(2, 158, 2), rgb(255, 255, 255));
        -webkit-transition: 0.5s;
        transition: 0.5s;
        border-radius: 20px;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(1.9vw) rotate(180deg) ;
        transform: translateX(1.9vw) rotate(180deg);
        -ms-transform: translateX(1.9vw) rotate(180deg);
    }

    .swish-container {
        grid-column: 2/4;
        grid-row: 2;
        display: grid;
        grid-template-columns: 0.5r 0.5fr;
        grid-template-rows: 1fr 1fr 1fr;
        border: solid rgb(68, 68, 68) 2px;
        border-radius: 4px;
        background-color: rgba(0, 255, 255, 0.066);
    }

    .credit-container {
        grid-column: 2/4;
        grid-row: 2;
        display: grid;
        grid-template-columns: 0.5r 0.5fr;
        grid-template-rows: repeat(4, 1fr);
        border: solid rgb(68, 68, 68) 2px;
        border-radius: 4px;
        background-color: rgba(0, 255, 255, 0.066);
    }



    .cardnumber-input-container {
        grid-column: 1/2;
        grid-row: 2/3;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ccv-input-container {
        grid-column: 2/3;
        grid-row: 2/3;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .expiration-date-container {
        grid-column: 1/2;
        grid-row: 3/4;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #number-input {
        font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        border: solid rgb(68, 68, 68) 1.5px;
        border-radius: 2px;
        width: 10rem;
    }

    #ccv-input {
        font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        border: solid rgb(68, 68, 68) 1.5px;
        border-radius: 2px;
        width: 3rem;
    }



    div.expiration-date-container > select {
        font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    #month-select {
        margin-right: 8px;
    }

    #month-select:hover {
        cursor: pointer;
    }

    #year-select:hover {
        cursor: pointer;
    }

    .payment-header {
        display: flex;
        grid-column: 1/3;
        justify-content: center;
    }

    .payment-header > img {
        width: 4vw;
        height: 4vw;
        align-self: center;
        margin-right: 0.5vw;
    }

    .input-container {
        display: flex;
        grid-column: 1/2;
        align-items: center;
        margin-left: 6vw;
    }
    .button-container {
        grid-column: 1/2;
        grid-row: 3/4;
        display: flex;
        align-items: center;
        margin-left: 4rem;
    }

    .button-container > button {
        background-color: rgb(26, 101, 42);
        border: solid rgb(68, 68, 68) 2px;
        border-radius: 2px;
    }

    .input-container button:hover {
        color: gold;
        border-color: gold;
    }

    div.credit-container > #total-cost {
        display: flex;
        grid-column: 2/3;
        justify-content: center;
        color: rgb(26, 101, 42);
    }

    div.swish-container > #total-cost {
        display: flex;
        grid-column: 2/3;
        grid-row: 2/3;
        align-items: center;
        justify-content: center;
        color: rgb(26, 101, 42);
    }

    #swish-number {
        padding: 0.2vw;
        width: 12rem;
        font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .error-message {
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        grid-column: 1/3;
        padding: 2rem
    }

    div.credit-container > .error-message {
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        grid-column: 2/3;
        grid-row: 4/5;
    }

    .send-request-container {
        display: flex;
        grid-row: 4/5;
        grid-column: 1/2;
        align-items: center;
        justify-content: center;
    }

    #place-order-btn {
        background-color: rgb(68, 68, 68);
        color: rgb(255, 255, 255);
        font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        border: solid 2px rgb(255, 255, 255);
        padding: 4px;
        border-radius: 2px;
    }

    #place-order-btn:hover{
        color:gold;
        border-color:gold;
    }


    @media (max-width: 1000px) {

        .customer-info-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 1vw;
            padding: 1vw;
        }

        .customer-info-container > h3 {
            text-align: center;
        }

        .error-message-container {
            display: flex;
            justify-content: center;
            color: red
        }


        .switch {
            position: relative;
            display: inline-block;
            width: 1.9rem;
            height: 1rem;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgb(68, 68, 68);
            -webkit-transition: 0.5s;
            transition: 0.5s;
            border-radius: 20px;
        }

        .slider:before{
            position: absolute;
            content: "";
            height: 0.85rem;
            width: 0.85rem;
            bottom: 0.23vw;
            background-image: linear-gradient(0.25turn, rgb(2, 158, 2), rgb(255, 255, 255));
            -webkit-transition: 0.5s;
            transition: 0.5s;
            border-radius: 20px;
        }

        .payment-container {
        display: grid;
        grid-template-columns: 0.25fr 0.75fr 0.75fr 0.25fr;
        grid-template-rows: 0.25fr 1fr;
        margin-bottom: 1rem;
        }

        .customer-info-container > h3 {
            margin-right: 2vw;
            font-size: 0.8rem;
        }

        .credit-container {
            grid-column: 2/4;
            grid-row: 2;
            display: grid;
            grid-template-columns: 0.5r 0.5fr;
            grid-template-rows: repeat(6, 1fr);
            border: solid rgb(68, 68, 68) 2px;
            border-radius: 4px;
            background-color: rgba(0, 255, 255, 0.066);
        }

        .cardnumber-input-container {
            grid-column: 1/3;
            grid-row: 2/3;
            display: flex;
            align-items: center;
        }

        .ccv-input-container {
            grid-column: 1/2;
            grid-row: 3/4;
            display: flex;
            justify-content: start;
            margin-left: 1rem;
        }

        .expiration-date-container {
            grid-column: 1/3;
            grid-row: 4/5;
            display: flex;
            align-items: center;
            
                }

        #number-input {
            font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            border: solid rgb(68, 68, 68) 1.5px;
            border-radius: 2px;
            width: 8rem;
            font-size: 0.7rem;
        }

        #ccv-input {
            font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            border: solid rgb(68, 68, 68) 1.5px;
            border-radius: 2px;
            width: 3rem;
        }

        .card-error-message {
            display: flex;
            align-items: center;
            justify-content: center;
            color: red;
            grid-column: 1/2;
            grid-row: 5/6;
        }


        .send-request-container {
            display: flex;
            grid-row: 6/7;
            grid-column: 1/2;
            align-items: center;
            justify-content: center;
        }

        #total-cost {
            font-size: 1rem;
            align-items: center;
        }

        .swish-container {
            grid-column: 2/4;
            grid-row: 2;
            display: grid;
            grid-template-columns: 0.5r 0.5fr;
            grid-template-rows: repeat(4, 1fr);
            border: solid rgb(68, 68, 68) 2px;
            border-radius: 4px;
            background-color: rgba(0, 255, 255, 0.066);
        }

        #swish-number {
            padding: 0.2vw;
            width: 12rem;
            font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }

        div.swish-container > #total-cost {
            grid-column: 1/3;
            grid-row: 3/4;
            margin-left: 3rem;
            color: rgb(26, 101, 42);
        }

        .input-container {
            display: flex;
            grid-column: 1/2;
            align-items: center;
            margin-left: 6vw;
        }

        .button-container {
            grid-column: 1/2;
            grid-row: 3/4;
            display: flex;
            align-items: center;
            margin-left: 2rem;
        }

        .button-container > button {
            background-color: rgb(26, 101, 42);
            border: solid rgb(68, 68, 68) 2px;
            border-radius: 2px;
        }

            
    }

     @media (max-width: 600px) {
        
        .switch {
            position: relative;
            display: inline-block;
            width: 1.5rem;
            height: 1rem;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgb(68, 68, 68);
            -webkit-transition: 0.5s;
            transition: 0.5s;
            border-radius: 20px;
        }

        .slider:before{
            position: absolute;
            content: "";
            height: 0.85rem;
            width: 0.85rem;
            left: 0.3vw;
            bottom: 0.28vw;
            background-image: linear-gradient(0.25turn, rgb(2, 158, 2), rgb(255, 255, 255));
            -webkit-transition: 0.5s;
            transition: 0.5s;
            border-radius: 20px;
        }

        .swish-container {
            grid-column: 2/4;
            grid-row: 2;
            display: grid;
            grid-template-columns: 0.5r 0.5fr;
            grid-template-rows: repeat(4, 1fr);
            border: solid rgb(68, 68, 68) 2px;
            border-radius: 4px;
            background-color: rgba(0, 255, 255, 0.066);
        }

        .input-container {
            display: flex;
            grid-column: 1/2;
            align-items: center;
            margin-left: 6vw;
        }

        .button-container {
            grid-column: 1/2;
            grid-row: 3/4;
            display: flex;
            align-items: center;
            margin-left: 2rem;
        }

        .button-container > button {
            background-color: rgb(26, 101, 42);
            border: solid rgb(68, 68, 68) 2px;
            border-radius: 2px;
        }

        .input-container button:hover {
            color: gold;
            border-color: gold;
        }

        div.credit-container > #total-cost {
            display: flex;
            grid-column: 2/3;
            justify-content: center;
            color: rgb(26, 101, 42);
        }

        div.swish-container > #total-cost {
            grid-column: 1/3;
            grid-row: 3/4;
            margin-left: 3rem;
            color: rgb(26, 101, 42);
        }

        #swish-number {
            padding: 0.2vw;
            font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }

        .error-message {
            display: flex;
            text-align: center;
            font-size: 0.8rem;
            color: red;
            grid-column: 1/3;
            padding: 1rem;
        }
        
    }

</style>