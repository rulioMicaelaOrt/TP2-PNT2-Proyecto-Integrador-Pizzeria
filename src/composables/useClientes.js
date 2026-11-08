
import { ref } from 'vue'
import {
  obtenerClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCuentaCliente
} from '../services/clientesService'

export function useClientes() {
  const clientes = ref([])
  const cliente = ref(null)
  const cargando = ref(false)
  const error = ref(null)

  // Obtener todos los clientes
  async function cargarClientes() {
    cargando.value = true
    error.value = null

    try {
      clientes.value = await obtenerClientes()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      cargando.value = false
    }
  }

  // Obtener un cliente por ID
  async function cargarCliente(id) {
    cargando.value = true
    error.value = null

    try {
      cliente.value = await obtenerCliente(id)
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      cargando.value = false
    }
  }

  // Crear un cliente
  async function agregarCliente(datos) {
    const nuevoCliente = await crearCliente(datos)
    clientes.value.push(nuevoCliente)
    return nuevoCliente
  }

  // Actualizar un cliente
  async function modificarCliente(id, datos) {
    const clienteActualizado = await actualizarCliente(id, datos)

    const index = clientes.value.findIndex(c => c.id === id)

    if (index !== -1) {
      clientes.value[index] = clienteActualizado
    }

    if (cliente.value?.id === id) {
      cliente.value = clienteActualizado
    }

    return clienteActualizado
  }

 // Eliminar cliente y cuenta de Auth
async function quitarCliente(id) {
  await eliminarCuentaCliente(id)

  clientes.value = clientes.value.filter(c => c.id !== id)
}

  return {
    clientes,
    cliente,
    cargando,
    error,
    cargarClientes,
    cargarCliente,
    agregarCliente,
    modificarCliente,
    quitarCliente
  }
}
