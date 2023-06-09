import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'
import CheckOutView from '../views/CheckOutView.vue'
import ProductView from '../views/ProductView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/menu',
      name: 'Menu',
      component: MenuView
    },
    {
      path: '/shoppingcart',
      name: 'Shoppingcart',
      component: ShoppingCartView
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: CheckOutView
    },
    {
      path: '/products/:type/:id',
      name: 'Product',
      component: ProductView
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
