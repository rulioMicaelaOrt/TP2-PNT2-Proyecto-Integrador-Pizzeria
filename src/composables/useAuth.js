import { ref } from 'vue'

// Estado inicial sencillo para la interfaz.
// La autenticación real se implementará cuando definamos los requisitos de la materia.
const usuario = ref(null)

export function useAuth() {
  function cerrarSesionLocal() {
    usuario.value = null
  }

  return { usuario, cerrarSesionLocal }
}
