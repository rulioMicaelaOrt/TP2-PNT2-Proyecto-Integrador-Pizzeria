
<template>
  <main>
    <h1>Administrar productos</h1>

    <section>
      <h2>{{ editando ? 'Editar producto' : 'Agregar producto' }}</h2>

      <form @submit.prevent="crearProducto">
        <label>
          Nombre
          <input v-model="producto.nombre" type="text" required />
        </label>

        <label>
          Descripción
          <textarea v-model="producto.descripcion" required></textarea>
        </label>

        <label>
          Precio
          <input
            v-model.number="producto.precio"
            type="number"
            min="0"
            required
          />
        </label>

        <label>
          Categoría
          <input v-model="producto.categoria" type="text" required />
        </label>

        <label>
          URL de imagen
          <input v-model="producto.imagen" type="url" />
        </label>

        <button type="submit" :disabled="guardando">
          {{
            guardando
              ? 'Guardando...'
              : editando
                ? 'Guardar cambios'
                : 'Agregar producto'
          }}
        </button>

        <button
          v-if="editando"
          type="button"
          @click="cancelarEdicion"
          :disabled="guardando"
        >
          Cancelar edición
        </button>

        <p v-if="mensaje">{{ mensaje }}</p>
        <p v-if="error">{{ error }}</p>
      </form>
    </section>

    <section>
      <h2>Productos existentes</h2>

      <div v-for="productoExistente in productos" :key="productoExistente.id">
        <p>
          {{ productoExistente.nombre }} - ${{ productoExistente.precio }}

          <button
            type="button"
            @click="editarProducto(productoExistente)"
          >
            Editar
          </button>

          <button
            type="button"
            @click="eliminarProducto(productoExistente)"
            :disabled="guardando"
          >
            Eliminar
          </button>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useProductos } from '../composables/useProductos'

const {
  productos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto: borrarProducto
} = useProductos()

const guardando = ref(false)
const editando = ref(false)
const mensaje = ref('')
const error = ref('')
const idProductoEditando = ref(null)

const producto = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: '',
  imagen: '',
  emoji: '🍕',
  destacado: false
})

function limpiarFormulario() {
  producto.value = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    imagen: '',
    emoji: '🍕',
    destacado: false
  }

  editando.value = false
  idProductoEditando.value = null
}

function editarProducto(productoSeleccionado) {
  producto.value = { ...productoSeleccionado }
  idProductoEditando.value = productoSeleccionado.id
  editando.value = true
  mensaje.value = ''
  error.value = ''
}

function cancelarEdicion() {
  limpiarFormulario()
  mensaje.value = ''
  error.value = ''
}

async function crearProducto() {
  guardando.value = true
  mensaje.value = ''
  error.value = ''

  try {
    if (editando.value) {
      await actualizarProducto(
        idProductoEditando.value,
        producto.value
      )

      mensaje.value = 'Producto actualizado correctamente.'
    } else {
      await agregarProducto(producto.value)

      mensaje.value = 'Producto agregado correctamente.'
    }

    limpiarFormulario()
  } catch (e) {
    error.value = editando.value
      ? 'No se pudo actualizar el producto.'
      : 'No se pudo guardar el producto.'
      

    console.error(e)
  } finally {
    guardando.value = false
  }
}

async function eliminarProducto(productoSeleccionado) {
  const confirmar = window.confirm(
    `¿Seguro que querés eliminar ${productoSeleccionado.nombre}?`
  )

  if (!confirmar) return

  guardando.value = true
  mensaje.value = ''
  error.value = ''

  try {
    await borrarProducto(productoSeleccionado.id)

    mensaje.value = 'Producto eliminado correctamente.'

    if (idProductoEditando.value === productoSeleccionado.id) {
      limpiarFormulario()
    }
  } catch (e) {
    error.value = 'No se pudo eliminar el producto.'
    console.error(e)
  } finally {
    guardando.value = false
  }
}
</script>
