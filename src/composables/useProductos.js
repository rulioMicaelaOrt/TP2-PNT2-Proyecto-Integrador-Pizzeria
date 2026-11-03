
import { ref, onMounted } from 'vue'
import { obtenerProductos } from '../services/productosService'

const productos = ref([])
export function useProductos() {
  const cargando = ref(false)
  const error = ref('')

  async function cargarProductos() {
    cargando.value = true
    error.value = ''

    try {
      if (productos.value.length === 0) {
  productos.value = await obtenerProductos()
}
    } catch (e) {
      error.value = 'No se pudieron cargar los productos.'
      console.error(e)
    } finally {
      cargando.value = false
    }
  }

  function agregarProducto(nuevoProducto) {
    productos.value.push({
      ...nuevoProducto,
      id: Date.now()
    })
  }

  onMounted(cargarProductos)

  return {
    productos,
    cargando,
    error,
    cargarProductos,
    agregarProducto
  }
}
