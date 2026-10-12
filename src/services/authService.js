// Acá centralizaremos el inicio y cierre de sesión.
// Implementaremos las funciones cuando definamos cómo será el login de la consigna.
export function validarFormularioLogin(email, password) {
  if (!email || !password) {
    return 'Completá el correo y la contraseña.'
  }

  return null
}
