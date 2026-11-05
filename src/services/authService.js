
import { supabase } from './supabase'

export function validarFormularioLogin(email, password) {
  if (!email || !password) {
    return 'Completá el correo y la contraseña.'
  }

  return null
}

export async function iniciarSesion(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw error
  }

  return data.user
}

export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function registrarUsuario(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    throw error
  }

  return data
}
