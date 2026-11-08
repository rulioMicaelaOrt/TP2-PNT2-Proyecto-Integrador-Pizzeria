
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductosView from '../views/ProductosView.vue'
import CarritoView from '../views/CarritoView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import AdminView from '../views/AdminView.vue'
import AdminClientesView from '../views/AdminClientesView.vue'
import MiPerfilView from '../views/MiPerfilView.vue'

import { supabase } from '../services/supabase'

const administradores = [
  '7aede11e-5426-42a6-a69e-d9a17d1c482b',
  '17c44491-090e-4dfa-9502-f664bdcec56d'
]

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: HomeView
  },
  {
    path: '/pizzas',
    name: 'pizzas',
    component: ProductosView
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: CarritoView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegistroView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiereAdmin: true }
  },
  {
    path: '/admin/clientes',
    name: 'admin-clientes',
    component: AdminClientesView,
    meta: { requiereAdmin: true }
  },
  {
    path: '/mi-perfil',
    name: 'mi-perfil',
    component: MiPerfilView,
    meta: { requiereAutenticacion: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach(async (to) => {
  if (to.meta.requiereAutenticacion || to.meta.requiereAdmin) {
    if (!supabase) {
      return { name: 'login' }
    }

    const { data, error } = await supabase.auth.getSession()

    if (error || !data.session) {
      return { name: 'login' }
    }

    const usuarioId = data.session.user.id

    if (to.meta.requiereAdmin && !administradores.includes(usuarioId)) {
      return { name: 'inicio' }
    }
  }
})

export default router
