
import { ref } from 'vue'
import { supabase } from '../services/supabase'
import { cerrarSesion as cerrarSesionService } from '../services/authService'

const usuario = ref(null)
const cargandoUsuario = ref(true)

async function recuperarSesion() {
  if (!supabase) {
    cargandoUsuario.value = false
    return
  }

  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error(error)
  }

  usuario.value = data.session?.user ?? null
  cargandoUsuario.value = false
}

recuperarSesion()

export function useAuth() {
  async function cerrarSesionLocal() {
    await cerrarSesionService()
    usuario.value = null
  }

  return {
    usuario,
    cargandoUsuario,
    cerrarSesionLocal
  }
}
