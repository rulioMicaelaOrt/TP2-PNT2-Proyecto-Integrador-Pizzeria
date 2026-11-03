
import { ref, onMounted } from 'vue'
import {
  obtenerProductos,
  crearProducto as guardarProducto
} from '../services/productosService'

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

async function agregarProducto(nuevoProducto) {
  try {
    const productoGuardado = await guardarProducto(nuevoProducto)

    productos.value.push(productoGuardado)

    return productoGuardado
  } catch (e) {
    console.error(e)
    throw e
  }
}

export function useProductos() {
  onMounted(cargarProductos)

  return {
    productos,
    cargando,
    error,
    cargarProductos,
    agregarProducto
  }
}
