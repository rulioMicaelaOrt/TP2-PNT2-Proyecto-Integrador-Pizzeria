
<script setup>
import { ref } from 'vue'
import { registrarUsuario } from '../services/authService'

const nombre = ref('')
const telefono = ref('')
const direccion = ref('')
const email = ref('')
const password = ref('')
const confirmarPassword = ref('')
const mensaje = ref('')
const error = ref('')
const cargando = ref(false)


async function registrarse() {
  mensaje.value = ''
  error.value = ''

  if (!nombre.value || !email.value || !password.value || !confirmarPassword.value) {
    error.value = 'Completá todos los campos obligatorios.'
    return
  }

  if (password.value !== confirmarPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  cargando.value = true

  try {
    await registrarUsuario(email.value, password.value, {
      nombre: nombre.value,
      telefono: telefono.value,
      direccion: direccion.value
    })

    mensaje.value = '¡Cuenta creada correctamente!'
  } catch (e) {
    console.error(e)

    if (e.message === 'User already registered') {
      error.value = 'Este correo ya está registrado. Iniciá sesión o recuperá tu contraseña.'
    } else {
      error.value = 'No se pudo crear la cuenta. Intentá nuevamente.'
    }
  } finally {
    cargando.value = false
  }
}

</script>

<template>
  <section class="container page-section login-layout">
    <div class="login-copy">
      <div class="eyebrow">SUMATE A LA MASA</div>

      <h1 class="page-title">
        Creá tu cuenta<span>.</span>
      </h1>

      <p class="page-intro">
        Registrate para disfrutar nuestras pizzas.
      </p>
    </div>

    <form class="login-card" @submit.prevent="registrarse">
      <h2>Crear cuenta</h2>
      
<label for="nombre">Nombre completo</label>
<input
  id="nombre"
  v-model.trim="nombre"
  type="text"
  placeholder="Tu nombre"
  required
/>

<label for="telefono">Teléfono</label>
<input
  id="telefono"
  v-model.trim="telefono"
  type="tel"
  placeholder="Tu teléfono"
/>

<label for="direccion">Dirección</label>
<input
  id="direccion"
  v-model.trim="direccion"
  type="text"
  placeholder="Tu dirección"
/>
      <label for="email">Correo electrónico</label>
      <input
        id="email"
        v-model.trim="email"
        type="email"
        placeholder="vos@ejemplo.com"
        autocomplete="email"
        required
      />

      <label for="password">Contraseña</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Mínimo 6 caracteres"
        autocomplete="new-password"
        required
      />

      <label for="confirmarPassword">Confirmar contraseña</label>
      <input
        id="confirmarPassword"
        v-model="confirmarPassword"
        type="password"
        placeholder="Repetí tu contraseña"
        autocomplete="new-password"
        required
      />

      <button class="button login-submit" type="submit" :disabled="cargando">
        {{ cargando ? 'Registrando...' : 'Crear cuenta →' }}
      </button>

      <p v-if="mensaje" class="form-message" role="status">
        {{ mensaje }}
      </p>

      <p v-if="error" class="form-message" role="alert">
        {{ error }}
      </p>

      <p class="login-note">
        ¿Ya tenés cuenta?
        <RouterLink to="/login">Iniciá sesión</RouterLink>
      </p>
    </form>
  </section>
</template>
