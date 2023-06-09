<script>
        export default {
                setup(props, {emit}) {
  
                        const validateInput = (e) => {
                                emit('validateCustomerInput',  e.target.id, e.target.value)
                        }

                        return {validateInput}
                },
        }
</script>

<template>
        <div class="customer-info">
                <div class="firstname-input-container">
                        <input type="text" id="firstname" placeholder="Firstname" @input="$event => validateInput($event)" />
                </div>
                <div class="lastname-input-container">
                        <input type="text" id="lastname" placeholder="Lastname" @input="$event => validateInput($event)" />
                </div>
                <div class="email-input-container">
                        <input type="text" id="email" placeholder="youremail@email.com" title="Email must contain '@'" @input="$event => validateInput($event)" />
                </div>
                <div class="number-input-container">
                        <input type="text" id="phone-number" placeholder="Mobile number" title="10 chars and only digits" @input="$event => validateInput($event)" />           
                </div>
                <div class="streetaddress-input-container">
                        <input type="text" id="streetaddress" placeholder="Street address" @input="$event => validateInput($event)" title="Input in format 'Yourstreet 420'"/>
                </div>
                <div class="postal-code-input-container">
                        <input type="text" id="postalcode" placeholder="Postal code" title="Postal code contains 5 digits" @input="$event => validateInput($event)" />
                </div>
                <div class="city-input-container">
                        <input type="text" id="city" placeholder="City" @input="$event => validateInput($event)" />                     
                </div>
        </div>
</template>


<style scoped>
        input {
                font-family: "Dosis", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                width: 12vw;
        }

        .customer-info {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(6, 1fr);
                justify-items: start;
                text-justify: start;
                background-color: rgba(0, 255, 255, 0.066);
                margin: 1rem 2rem;
                padding: 1vw;
                border: solid rgb(68, 68, 68)
        }


        .customer-info > div {
                margin-right: 1vw;
                display: flex;
                flex-direction: column;
        }

        .firstname-input-container {
                grid-column: 1 / 2;
                grid-row: 1 / 2;
        }

        .lastname-input-container {
                grid-column: 2 / 3;
                grid-row: 1 / 2;
        }

        .email-input-container {
                grid-column: 1/2;
                grid-row: 3/4;
        }

        .number-input-container {
                grid-column: 2/3;
                grid-row: 3/4;
        }

        .streetaddress-input-container {
                grid-column: 1/2;
                grid-row: 5/6;
        }

        .postal-code-input-container {
                grid-column: 2/3;
                grid-row: 5/6
        }

        .city-input-container {
                grid-column: 1/2;
                grid-row: 7/8;
        }

        .info-input {
                margin-top: 1vw;
        }

        @media (max-width: 1000px) {
                input {
                        width: 8rem;
                }

                .customer-info {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        grid-template-rows: 0.1fr repeat(6, 1fr) 0.1fr;
                        background-color: rgba(0, 255, 255, 0.066);
                        margin: 1rem 2rem;
                        text-align: center;
                        text-justify: center;
                        padding: 1vw;
                        border: solid rgb(68, 68, 68);
                }

                .customer-info > div {
                        align-self: center;
                        justify-self: center;
                }
        }
                
        
</style>