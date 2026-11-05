
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCarrito } from '../composables/useCarrito'
import { useAuth } from '../composables/useAuth'

const { cantidadTotal } = useCarrito()
const { usuario, cerrarSesionLocal } = useAuth()
const router = useRouter()

const administradores = [
  '7aede11e-5426-42a6-a69e-d9a17d1c482b',
  '17c44491-090e-4dfa-9502-f664bdcec56d'
]

const esAdministrador = computed(() =>
  administradores.includes(usuario.value?.id)
)

async function cerrarSesion() {
  try {
    await cerrarSesionLocal()
    await router.push('/login')
  } catch (error) {
    console.error(error)
    alert('No se pudo cerrar la sesión.')
  }
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/" aria-label="La Masa, ir al inicio">
        <span class="brand-mark">✦</span>
        <span>
          la masa<span class="brand-period">.</span>
          <small>PIZZERÍA ARTESANAL</small>
        </span>
      </RouterLink>

      <nav class="main-nav" aria-label="Navegación principal">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/pizzas">Nuestras pizzas</RouterLink>

        <RouterLink to="/carrito">
          Mi pedido
          <span class="cart-icon">🛒</span>
          <span v-if="cantidadTotal > 0" class="cart-count">
            {{ cantidadTotal }}
          </span>
        </RouterLink>

        <RouterLink v-if="esAdministrador" to="/admin">
          Administración
        </RouterLink>
      </nav>

      <div>
        <RouterLink
          v-if="!usuario"
          class="button button-small header-order"
          to="/login"
        >
          Iniciar sesión
        </RouterLink>

        <button
          v-else
          class="button button-small header-order"
          type="button"
          @click="cerrarSesion"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </header>
</template>
