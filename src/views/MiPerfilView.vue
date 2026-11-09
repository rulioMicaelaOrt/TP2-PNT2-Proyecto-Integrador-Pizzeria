
<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useClientes } from '../composables/useClientes'
import { usePedidos } from '../composables/usePedidos'

const { usuario } = useAuth()

const {
  cliente,
  cargarCliente,
  modificarCliente
} = useClientes()

const {
  pedidos,
  cargando: cargandoPedidos,
  cargarPedidosCliente
} = usePedidos()

const nombre = ref('')
const telefono = ref('')
const direccion = ref('')

const cargando = ref(false)
const guardando = ref(false)

const mensaje = ref('')
const error = ref('')

onMounted(async () => {
  try {
    cargando.value = true
    error.value = ''

    if (!usuario.value) {
      error.value = 'No hay un usuario autenticado.'
      return
    }

    await cargarCliente(usuario.value.id)
    await cargarPedidosCliente(usuario.value.id)

    nombre.value = cliente.value.nombre
    telefono.value = cliente.value.telefono || ''
    direccion.value = cliente.value.direccion || ''

  } catch (e) {
    console.error(e)
    error.value = 'No se pudo cargar tu perfil.'
  } finally {
    cargando.value = false
  }
})

async function guardarCambios() {
  try {
    guardando.value = true
    mensaje.value = ''
    error.value = ''

    await modificarCliente(usuario.value.id, {
      nombre: nombre.value,
      telefono: telefono.value,
      direccion: direccion.value
    })

    mensaje.value = 'Tu perfil se actualizó correctamente.'

  } catch (e) {
    console.error(e)
    error.value = 'No se pudieron guardar los cambios.'
  } finally {
    guardando.value = false
  }
}

function formatoPrecio(precio) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(precio)
}

function formatoFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <main class="container page-section perfil-page">

    <h1>Mi perfil</h1>

    <p class="perfil-description">
      Consultá y actualizá tus datos personales.
    </p>

    <p v-if="cargando">
      Cargando perfil...
    </p>

    <div v-else-if="error && !cliente" class="perfil-error">
      {{ error }}
    </div>

    <form v-else class="perfil-form" @submit.prevent="guardarCambios">

      <div class="form-group">
        <label for="nombre">Nombre completo</label>
        <input id="nombre" v-model="nombre" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" :value="usuario.email" type="email" disabled />
        <small>El email no se puede modificar desde esta sección.</small>
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input id="telefono" v-model="telefono" type="text" />
      </div>

      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input id="direccion" v-model="direccion" type="text" />
      </div>

      <button class="button" type="submit" :disabled="guardando">
        {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
      </button>

      <p v-if="mensaje" class="perfil-success">
        {{ mensaje }}
      </p>

      <p v-if="error" class="perfil-error">
        {{ error }}
      </p>

    </form>

    <section class="historial-section">
      <h2>Historial de pedidos</h2>

      <p v-if="cargandoPedidos">
        Cargando pedidos...
      </p>

      <p v-else-if="pedidos.length === 0" class="perfil-description">
        Todavía no realizaste ningún pedido.
      </p>

      <div v-else class="historial-list">
        <article
          v-for="pedido in pedidos"
          :key="pedido.id"
          class="pedido-card"
        >
          <div class="pedido-header">
            <strong>Pedido #{{ pedido.id }}</strong>
            <span>{{ formatoFecha(pedido.created_at) }}</span>
          </div>

          <ul class="pedido-items">
            <li v-for="item in pedido.items" :key="item.id">
              <span>{{ item.emoji }} {{ item.cantidad }}x {{ item.nombre }}</span>
              <span>{{ formatoPrecio(item.precio * item.cantidad) }}</span>
            </li>
          </ul>

          <div class="pedido-footer">
            <strong>Total: {{ formatoPrecio(pedido.total) }}</strong>
          </div>
        </article>
      </div>
    </section>

  </main>
</template>
