
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

        <button type="submit">Agregar producto</button>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useProductos } from '../composables/useProductos'

const { agregarProducto } = useProductos()

const producto = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: '',
  imagen: ''
})

function crearProducto() {
  agregarProducto(producto.value)

  alert('Producto agregado correctamente')

  producto.value = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    imagen: ''
  }
}
</script>
