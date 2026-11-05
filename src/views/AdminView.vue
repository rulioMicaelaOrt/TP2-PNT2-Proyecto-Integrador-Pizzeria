
<template>
  <main class="container page-section admin-page">
    <div class="admin-heading">
      <div class="eyebrow">PANEL DE CONTROL</div>
      <h1 class="page-title">Administrar productos<span>.</span></h1>
      <p class="page-intro">
        Gestioná el menú de La Masa: agregá, editá o eliminá pizzas.
      </p>
    </div>

    <!-- FORMULARIO -->
    <section class="admin-form-card">
      <div class="admin-section-heading">
        <div>
          <span class="admin-label">
            {{ editando ? 'MODIFICACIÓN' : 'NUEVO PRODUCTO' }}
          </span>
          <h2>{{ editando ? 'Editar producto' : 'Agregar producto' }}</h2>
        </div>
        <span class="admin-pizza-icon">🍕</span>
      </div>

      <form class="admin-form" @submit.prevent="crearProducto">
        <div class="admin-fields">
          <label>
            Nombre
            <input v-model="producto.nombre" type="text" placeholder="Ej. Muzza" required />
          </label>

          <label>
            Descripción
            <textarea v-model="producto.descripcion" placeholder="Ingredientes y detalles..." required></textarea>
          </label>

          <label>
            Precio
            <input v-model.number="producto.precio" type="number" min="0" placeholder="10000" required />
          </label>

          <label>
            Categoría
            <input v-model="producto.categoria" type="text" placeholder="Ej. Clásicas" required />
          </label>

          <label class="admin-field-full">
            URL de imagen
            <input v-model="producto.imagen" type="url" placeholder="https://..." />
          </label>
        </div>

        <div class="admin-form-actions">
          <button class="button" type="submit" :disabled="guardando">
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
            class="admin-button-secondary"
            type="button"
            @click="cancelarEdicion"
            :disabled="guardando"
          >
            Cancelar
          </button>
        </div>

        <p v-if="mensaje" class="admin-message admin-success" role="status">
          {{ mensaje }}
        </p>

        <p v-if="error" class="admin-message admin-error" role="alert">
          {{ error }}
        </p>
      </form>
    </section>

    <!-- LISTADO -->
    <section class="admin-products-section">
      <div class="admin-section-heading admin-list-heading">
        <div>
          <span class="admin-label">MENÚ</span>
          <h2>Productos existentes</h2>
        </div>

        <span class="admin-products-count">
          {{ productos.length }} productos
        </span>
      </div>

      <div v-if="productos.length" class="admin-products-grid">
        <article
          v-for="productoExistente in productos"
          :key="productoExistente.id"
          class="admin-product-card"
        >
          <div class="admin-product-image">
            <img
              v-if="productoExistente.imagen"
              :src="productoExistente.imagen"
              :alt="productoExistente.nombre"
            />
            <span v-else>{{ productoExistente.emoji || '🍕' }}</span>
          </div>

          <div class="admin-product-info">
            <span class="admin-product-category">
              {{ productoExistente.categoria || 'Pizza' }}
            </span>

            <h3>{{ productoExistente.nombre }}</h3>

            <p>{{ productoExistente.descripcion }}</p>

            <strong class="admin-product-price">
              ${{ productoExistente.precio }}
            </strong>

            <div class="admin-product-actions">
              <button
                class="admin-button-edit"
                type="button"
                @click="editarProducto(productoExistente)"
              >
                Editar
              </button>

              <button
                class="admin-button-delete"
                type="button"
                @click="eliminarProducto(productoExistente)"
                :disabled="guardando"
              >
                Eliminar
              </button>
            </div>
          </div>
        </article>
      </div>

      <p v-else class="admin-empty">
        Todavía no hay productos cargados.
      </p>
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
