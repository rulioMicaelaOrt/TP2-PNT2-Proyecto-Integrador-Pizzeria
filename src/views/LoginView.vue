<script setup>
import { ref } from 'vue'
import { validarFormularioLogin } from '../services/authService'

const email = ref('')
const password = ref('')
const mensaje = ref('')

function iniciarSesion() {
  mensaje.value = validarFormularioLogin(email.value, password.value) || 'El formulario está listo. Falta conectar la autenticación.'
}
</script>

<template>
  <section class="container page-section login-layout">
    <div class="login-copy">
      <div class="eyebrow">QUÉ BUENO VERTE</div>
      <h1 class="page-title">Tu próxima pizza<br />está cerca<span>.</span></h1>
      <p class="page-intro">Iniciá sesión para continuar. La autenticación se conectará cuando definamos los requisitos del proyecto.</p>
    </div>
    <form class="login-card" @submit.prevent="iniciarSesion">
      <h2>Iniciar sesión</h2>
      <label for="email">Correo electrónico</label>
      <input id="email" v-model.trim="email" type="email" placeholder="vos@ejemplo.com" autocomplete="email" />
      <label for="password">Contraseña</label>
      <input id="password" v-model="password" type="password" placeholder="Tu contraseña" autocomplete="current-password" />
      <button class="button login-submit" type="submit">Continuar <span>→</span></button>
      <p v-if="mensaje" class="form-message" role="status">{{ mensaje }}</p>
      <p class="login-note">Pantalla inicial de práctica; todavía no valida usuarios reales.</p>
    </form>
  </section>
</template>
