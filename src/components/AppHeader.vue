<script setup>
import { useCarrito } from "../composables/useCarrito";

const { cantidadTotal } = useCarrito();
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/" aria-label="La Masa, ir al inicio">
        <span class="brand-mark">✦</span>
        <span
          >la masa<span class="brand-period">.</span
          ><small>PIZZERÍA ARTESANAL</small></span
        >
      </RouterLink>

      <nav class="main-nav" aria-label="Navegación principal">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/pizzas">Nuestras pizzas</RouterLink>
        <RouterLink to="/carrito">
          Mi pedido
          <span class="cart-icon">🛒</span>
          <span v-if="cantidadTotal > 0" class="cart-count">
            {{ cantidadTotal }}
          </span>
        </RouterLink>
      </nav>

      <RouterLink class="button button-small header-order" to="/pizzas">
        Pedir ahora <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>
  </header>
</template>
