import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { faHouseChimney, faHamburger, faGlassWater, faCircleUser, faBasketShopping, faCashRegister, faDollarSign, faBowlFood, faPlus, faMinus, faStar, faJedi} from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar} from '@fortawesome/free-regular-svg-icons'
import { faCcMastercard, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(faHouseChimney,
                faHamburger,
                faGlassWater,
                faCircleUser,
                faBasketShopping,
                faCcMastercard,
                faFacebook,
                faTwitter,
                faInstagram, 
                faCashRegister,
                faDollarSign,
                faBowlFood,
                faPlus,
                faMinus,
                faStar,
                regularStar,
                faJedi)

const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('font-awesome-layers', FontAwesomeLayers)
    .component('font-awesome-layer-text', FontAwesomeLayersText)

app.use(router)

app.mount('#app')

