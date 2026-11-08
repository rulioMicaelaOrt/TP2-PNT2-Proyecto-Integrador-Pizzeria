
import { supabase } from './supabase'

// Obtener todos los clientes
export async function obtenerClientes() {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('nombre')

  console.log('Datos de Supabase:', data)
  console.log('Error de Supabase:', error)

  if (error) throw error
  return data
}

// Obtener un cliente por ID
export async function obtenerCliente(id) {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return data
}

// Crear un cliente
export async function crearCliente(cliente) {
  const { data, error } = await supabase
    .from('clientes')
    .insert(cliente)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

// Actualizar un cliente
export async function actualizarCliente(id, cliente) {
  try {
    const resultado = await supabase
      .from('clientes')
      .update(cliente)
      .eq('id', id)
      .select()
      .single()

    if (resultado.error) {
      throw resultado.error
    }

    return resultado.data

  } catch (error) {
    console.error('Error al actualizar cliente:', error)
    throw error
  }
}

// Eliminar un cliente
export async function eliminarCliente(id) {
  try {
    const resultado = await supabase
      .from('clientes')
      .delete()
      .eq('id', id)
      .select()

    if (resultado.error) {
      throw resultado.error
    }

    if (resultado.data.length === 0) {
      throw new Error('No se encontró ningún cliente para eliminar.')
    }

  } catch (error) {
    console.error('Error al eliminar cliente:', error)
    throw error
  }
}

/* Administrar cuentas mediante Edge Function */

// Eliminar cliente y su cuenta de Supabase Auth
export async function eliminarCuentaCliente(id) {
  const { data, error } = await supabase.functions.invoke(
    'administrar-clientes',
    {
      body: {
        accion: 'eliminarCliente',
        clienteId: id
      }
    }
  )

  if (error) throw error
  if (data?.error) throw new Error(data.error)

  return data
}

// Cambiar email de Auth y de la tabla clientes
export async function cambiarEmailCliente(id, email) {
  const { data, error } = await supabase.functions.invoke(
    'administrar-clientes',
    {
      body: {
        accion: 'actualizarEmail',
        clienteId: id,
        email
      }
    }
  )

  if (error) throw error
  if (data?.error) throw new Error(data.error)

  return data
}
