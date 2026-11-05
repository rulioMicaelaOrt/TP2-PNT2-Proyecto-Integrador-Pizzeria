
import { supabase } from './supabase'

// Obtener todos los productos
export async function obtenerProductos() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('id')

  if (error) {
    throw error
  }

  return data
}

// Crear un producto
export async function crearProducto(producto) {
  const { data, error } = await supabase
    .from('productos')
    .insert(producto)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

// Actualizar un producto
export async function actualizarProducto(id, producto) {
  try {
    let resultado = await supabase
      .from('productos')
      .update(producto)
      .eq('id', id)
      .select()
      .single()

    if (resultado.error) {
      throw resultado.error
    }

    return resultado.data

  } catch (error) {
    console.log('Error al actualizar producto:', error)
    throw error
  }
}


// Eliminar un producto
export async function eliminarProducto(id) {
  try {
    let resultado = await supabase
      .from('productos')
      .delete()
      .eq('id', id)
      .select()

    if (resultado.error) {
      throw resultado.error
    }

    if (resultado.data.length === 0) {
      throw new Error('No se encontró ningún producto para eliminar.')
    }

  } catch (error) {
    console.log('Error al eliminar producto:', error)
    throw error
  }
}
