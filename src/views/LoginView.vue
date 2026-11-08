
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  validarFormularioLogin,
  iniciarSesion as iniciarSesionService
} from '../services/authService'
import { useAuth } from '../composables/useAuth'

const { usuario } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const mensaje = ref('')
const cargando = ref(false)

async function iniciarSesion() {
  mensaje.value = validarFormularioLogin(email.value, password.value) || ''

  if (mensaje.value) return

  cargando.value = true

  try {
    usuario.value = await iniciarSesionService(
      email.value,
      password.value
    )

    await router.push('/')

  } catch (error) {
    console.error(error)
    mensaje.value = 'Correo o contraseña incorrectos.'
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <section class="container page-section login-layout">
    <div class="login-copy">
      <div class="eyebrow">QUÉ BUENO VERTE</div>

      <h1 class="page-title">
        Tu próxima pizza<br />está cerca<span>.</span>
      </h1>

      <p class="page-intro">
        Iniciá sesión para continuar.
      </p>
    </div>

    <form class="login-card" @submit.prevent="iniciarSesion">
      <h2>Iniciar sesión</h2>

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
        placeholder="Tu contraseña"
        autocomplete="current-password"
        required
      />

      <button class="button login-submit" type="submit" :disabled="cargando">
        {{ cargando ? 'Ingresando...' : 'Continuar →' }}
      </button>

      <p v-if="mensaje" class="form-message" role="status">
        {{ mensaje }}
      </p>

      <p class="login-note">
        ¿No tenés cuenta?
        <RouterLink to="/registro">Registrate</RouterLink>
      </p>
    </form>
  </section>
</template>
