
<template>
  <main class="admin-clientes">
    <h1>Administrar clientes</h1>

    <p v-if="cargando">Cargando clientes...</p>

    <p v-if="mensaje" class="mensaje-exito">
      {{ mensaje }}
    </p>

    <p v-if="error" class="mensaje-error">
      {{ error }}
    </p>

    <table v-if="!cargando">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.direccion }}</td>

          <td>
            <button @click="editarCliente(cliente)">
              Editar
            </button>

            <button @click="eliminar(cliente)">
              Eliminar
            </button>
          </td>
        </tr>

        <tr v-if="clientes.length === 0">
          <td colspan="5">
            No hay clientes registrados.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- FORMULARIO DE EDICIÓN -->
    <section v-if="mostrarFormulario">
      <h2>Editar cliente</h2>

      <form @submit.prevent="guardarCliente">
        <label>
          Nombre
          <input v-model="formulario.nombre" required />
        </label>

        <label>
          Email
          <input
            v-model="formulario.email"
            type="email"
            required
          />
        </label>

        <label>
          Teléfono
          <input v-model="formulario.telefono" />
        </label>

        <label>
          Dirección
          <input v-model="formulario.direccion" />
        </label>

        <button type="submit" :disabled="guardando">
          {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
        </button>

        <button type="button" @click="cancelarFormulario">
          Cancelar
        </button>
      </form>
    </section>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useClientes } from '../composables/useClientes'
import { cambiarEmailCliente } from '../services/clientesService'

const {
  clientes,
  cargando,
  error,
  cargarClientes,
  modificarCliente,
  quitarCliente
} = useClientes()

const mensaje = ref('')
const mostrarFormulario = ref(false)
const guardando = ref(false)
const idClienteEditar = ref(null)
const emailOriginal = ref('')

const formulario = reactive({
  nombre: '',
  email: '',
  telefono: '',
  direccion: ''
})

function editarCliente(cliente) {
  idClienteEditar.value = cliente.id

  formulario.nombre = cliente.nombre
  formulario.email = cliente.email
  formulario.telefono = cliente.telefono || ''
  formulario.direccion = cliente.direccion || ''

  emailOriginal.value = cliente.email

  mostrarFormulario.value = true
  mensaje.value = ''
  error.value = null
}

function cancelarFormulario() {
  mostrarFormulario.value = false
  idClienteEditar.value = null
}

async function guardarCliente() {
  guardando.value = true
  error.value = null
  mensaje.value = ''

  try {
    const id = idClienteEditar.value

    // 1. Actualizamos el email si cambió.
    if (formulario.email.trim().toLowerCase() !== emailOriginal.value.trim().toLowerCase()) {
      await cambiarEmailCliente(id, formulario.email)
    }

    // 2. Actualizamos los demás datos del perfil.
    const datos = {
      nombre: formulario.nombre,
      telefono: formulario.telefono,
      direccion: formulario.direccion
    }

    await modificarCliente(id, datos)

    // 3. Refrescamos la lista para mostrar el email actualizado.
    await cargarClientes()

    mensaje.value = 'Cliente actualizado correctamente.'
    mostrarFormulario.value = false
    idClienteEditar.value = null
  // } catch (e) {
  //   console.error(e)
  //   error.value = e.message || 'No se pudo actualizar el cliente.'
  // }
  } catch (e) {
  console.error('Error al guardar cliente:', e)

  if (e.context) {
    const respuesta = await e.context.json()
    console.log('Respuesta de Edge Function:', respuesta)

    error.value = respuesta.error || 'Error al actualizar cliente.'
  } else {
    error.value = e.message || 'No se pudo actualizar el cliente.'
  }
}
   finally {
    guardando.value = false
  }
}

async function eliminar(cliente) {
  const confirmar = window.confirm(
    `¿Seguro que querés eliminar a ${cliente.nombre}? Se eliminará también su cuenta de acceso.`
  )

  if (!confirmar) return

  error.value = null
  mensaje.value = ''

  try {
    await quitarCliente(cliente.id)
    mensaje.value = 'Cliente y cuenta eliminados correctamente.'
  } catch (e) {
    console.error(e)
    error.value = e.message || 'No se pudo eliminar el cliente.'
  }
}

onMounted(() => {
  cargarClientes()
})
</script>
