<script setup>
defineProps({
  producto: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['agregar'])

function formatoPrecio(precio) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)
}
</script>

<template>
  <article class="product-card">
    <div class="product-art" :class="`product-art-${producto.id % 4}`">
      <span class="product-emoji" aria-hidden="true">{{ producto.emoji }}</span>
      <span v-if="producto.destacado" class="product-tag">Favorita</span>
    </div>
    <div class="product-info">
      <div class="product-meta">{{ producto.categoria }}</div>
      <h3>{{ producto.nombre }}</h3>
      <p>{{ producto.descripcion }}</p>
      <div class="product-bottom">
        <strong>{{ formatoPrecio(producto.precio) }}</strong>
        <button class="add-button" type="button" :aria-label="`Agregar ${producto.nombre}`" @click="emit('agregar', producto)">+</button>
      </div>
    </div>
  </article>
</template>
