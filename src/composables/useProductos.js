import { ref, onMounted } from 'vue'
import { obtenerProductos } from '../services/productosService'

export function useProductos() {
  const productos = ref([])
  const cargando = ref(false)
  const error = ref('')

  async function cargarProductos() {
    cargando.value = true
    error.value = ''

    try {
      productos.value = await obtenerProductos()
    } catch (e) {
      error.value = 'No se pudieron cargar los productos.'
      console.error(e)
    } finally {
      cargando.value = false
    }
  }

  onMounted(cargarProductos)

  return { productos, cargando, error, cargarProductos }
}
