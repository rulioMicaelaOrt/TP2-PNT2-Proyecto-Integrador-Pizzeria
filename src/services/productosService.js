
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
