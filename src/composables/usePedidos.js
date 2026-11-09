import { ref } from 'vue'
import {
  crearPedido,
  obtenerPedidosCliente
} from '../services/pedidosService'

export function usePedidos() {
  const pedidos = ref([])
  const cargando = ref(false)
  const error = ref(null)

  async function cargarPedidosCliente(clienteId) {
    cargando.value = true
    error.value = null

    try {
      pedidos.value = await obtenerPedidosCliente(clienteId)
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      cargando.value = false
    }
  }

  async function registrarPedido(datosPedido) {
    cargando.value = true
    error.value = null

    try {
      const nuevoPedido = await crearPedido(datosPedido)
      pedidos.value.unshift(nuevoPedido)
      return nuevoPedido
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      cargando.value = false
    }
  }

  return {
    pedidos,
    cargando,
    error,
    cargarPedidosCliente,
    registrarPedido
  }
}
