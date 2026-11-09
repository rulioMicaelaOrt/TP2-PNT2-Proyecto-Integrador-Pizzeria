import { supabase } from './supabase'

// Crear un nuevo pedido
export async function crearPedido(pedido) {
  const { data, error } = await supabase
    .from('pedidos')
    .insert(pedido)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

// Obtener los pedidos de un cliente
export async function obtenerPedidosCliente(clienteId) {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('cliente_id', clienteId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}
