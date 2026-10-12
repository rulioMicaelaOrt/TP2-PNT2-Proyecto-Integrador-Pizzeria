import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductosView from '../views/ProductosView.vue'
import CarritoView from '../views/CarritoView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', name: 'inicio', component: HomeView },
  { path: '/pizzas', name: 'pizzas', component: ProductosView },
  { path: '/carrito', name: 'carrito', component: CarritoView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
