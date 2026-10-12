<script setup>
import { useCarrito } from "../composables/useCarrito";

const { items, cantidadTotal, total, aumentar, disminuir, eliminar, vaciar } =
  useCarrito();

function formatoPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
}
</script>

<template>
  <section class="container page-section">
    <div class="eyebrow">TU PEDIDO</div>
    <h1 class="page-title">Tu carrito<span>.</span></h1>

    <div v-if="items.length === 0" class="centered-page">
      <div class="empty-cart-icon">🛒</div>
      <h2>Tu carrito está esperando.</h2>
      <p class="page-intro">
        Todavía no agregaste ninguna pizza. Elegí tus favoritas y armamos el
        pedido.
      </p>
      <RouterLink class="button" to="/pizzas">
        Explorar el menú <span>→</span>
      </RouterLink>
    </div>

    <div v-else class="cart-content">
      <article v-for="item in items" :key="item.id" class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-emoji">{{ item.emoji }}</span>
          <div>
            <h3>{{ item.nombre }}</h3>
            <p>{{ formatoPrecio(item.precio) }} por unidad</p>
          </div>
        </div>

        <div class="cart-item-actions">
          <button type="button" @click="disminuir(item.id)">−</button>
          <span>{{ item.cantidad }}</span>
          <button type="button" @click="aumentar(item.id)">+</button>
        </div>

        <strong>{{ formatoPrecio(item.precio * item.cantidad) }}</strong>

        <button type="button" class="cart-remove" @click="eliminar(item.id)">
          Eliminar
        </button>
      </article>

      <div class="cart-summary">
        <p>
          Unidades: <strong>{{ cantidadTotal }}</strong>
        </p>
        <h2>Total: {{ formatoPrecio(total) }}</h2>

        <div class="cart-summary-actions">
          <RouterLink class="button" to="/pizzas">
            Seguir comprando
          </RouterLink>
          <button type="button" class="button" @click="vaciar">
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
