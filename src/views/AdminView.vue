
<template>
  <main>
    <h1>Administrar productos</h1>

    <section>
      <h2>Agregar producto</h2>

      
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
    <input v-model.number="producto.precio" type="number" min="0" required />
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
    {{ guardando ? 'Guardando...' : 'Agregar producto' }}
  </button>

  <p v-if="mensaje">{{ mensaje }}</p>
  <p v-if="error">{{ error }}</p>
</form>

    </section>
  </main>
</template>


<script setup>
import { ref } from 'vue'
import { useProductos } from '../composables/useProductos'

const { agregarProducto } = useProductos()

const guardando = ref(false)
const mensaje = ref('')
const error = ref('')

const producto = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: '',
  imagen: '',
  emoji: '🍕',
  destacado: false
})

async function crearProducto() {
  guardando.value = true
  mensaje.value = ''
  error.value = ''

  try {
    await agregarProducto(producto.value)

    mensaje.value = 'Producto agregado correctamente.'

    producto.value = {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      imagen: '',
      emoji: '🍕',
      destacado: false
    }
  } catch (e) {
    error.value = 'No se pudo guardar el producto.'
    console.error(e)
  } finally {
    guardando.value = false
  }
}
</script>

