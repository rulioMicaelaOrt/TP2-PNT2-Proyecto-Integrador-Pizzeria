
import { ref, onMounted } from 'vue'
import {
  obtenerProductos,
  crearProducto as guardarProducto,
  actualizarProducto as modificarProducto,
  eliminarProducto as borrarProducto
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
async function actualizarProducto(id, producto) {
  try {
    let resultado = await modificarProducto(id, producto)

    let indice = productos.value.findIndex(p => p.id === id)

    if (indice !== -1) {
      productos.value[indice] = resultado
    }

    return resultado

  } catch (error) {
    console.log(error)
    throw error
  }
}

async function eliminarProducto(id) {
  try {
    await borrarProducto(id)

    productos.value = productos.value.filter(
      producto => producto.id !== id
    )

  } catch (error) {
    console.log(error)
    throw error
  }
}
export function useProductos() {
  onMounted(cargarProductos)

  return {
  productos,
  cargando,
  error,
  cargarProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
}
}