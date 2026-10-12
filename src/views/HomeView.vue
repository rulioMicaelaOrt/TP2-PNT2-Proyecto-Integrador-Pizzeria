<script setup>
import { computed, ref } from "vue";
import ProductoCard from "../components/ProductoCard.vue";
import { useProductos } from "../composables/useProductos";
import { useCarrito } from "../composables/useCarrito";

const { productos, cargando, error } = useProductos();
const { agregar } = useCarrito();

const mensaje = ref("");

const destacados = computed(() =>
  productos.value.filter((producto) => producto.destacado).slice(0, 3),
);

function agregarAlPedido(producto) {
  console.log("1. Se hizo clic en:", producto.nombre);

  agregar(producto);

  console.log("2. Carrito actualizado");
  mensaje.value = `${producto.nombre} se agregó al carrito.`;
}
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span> PIZZA ARTESANAL, TODOS LOS DÍAS
          </div>
          <h1>Una buena pizza<br />lo <span>cambia todo.</span></h1>
          <p class="hero-description">
            Masa hecha a mano, ingredientes de verdad y ese primer bocado que te
            hace cerrar los ojos.
          </p>
          <div class="hero-actions">
            <RouterLink class="button" to="/pizzas"
              >Descubrí el menú <span>→</span></RouterLink
            >
            <a class="text-link" href="#favoritas"
              >Conocé nuestras favoritas <span>↓</span></a
            >
          </div>
          <div class="hero-note">
            <span class="note-stars">★★★★★</span>
            <span
              ><strong>Hechas con amor</strong> desde el primer amasado</span
            >
          </div>
        </div>

        <div
          class="hero-visual"
          aria-label="Ilustración de una pizza artesanal"
        >
          <div class="hero-stamp">FRESCA<br />Y CASERA</div>
          <div class="pizza-plate">
            <div class="pizza">
              <span class="topping topping-one"></span>
              <span class="topping topping-two"></span>
              <span class="topping topping-three"></span>
              <span class="topping topping-four"></span>
              <span class="topping topping-five"></span>
              <span class="basil basil-one">✦</span>
              <span class="basil basil-two">✦</span>
            </div>
          </div>
          <div class="visual-caption">
            <span>01 /</span> EL SABOR DE LO SIMPLE
          </div>
        </div>
      </div>
      <div class="hero-bottom-line"></div>
    </section>

    <section class="features-strip">
      <div class="container features-grid">
        <div>
          <span class="feature-icon">✳</span
          ><span
            ><strong>Masa artesanal</strong
            ><small>Fermentación lenta</small></span
          >
        </div>
        <div>
          <span class="feature-icon">♡</span
          ><span
            ><strong>Ingredientes frescos</strong
            ><small>Elegidos cada día</small></span
          >
        </div>
        <div>
          <span class="feature-icon">⌁</span
          ><span
            ><strong>Recién horneadas</strong
            ><small>Directo a tu mesa</small></span
          >
        </div>
      </div>
    </section>

    <section id="favoritas" class="section container">
      <div class="section-heading">
        <div>
          <div class="eyebrow">PARA EMPEZAR BIEN</div>
          <h2>Las favoritas de la casa<span>.</span></h2>
        </div>
        <RouterLink class="text-link" to="/pizzas"
          >Ver todo el menú <span>→</span></RouterLink
        >
      </div>

      <p v-if="mensaje" class="state-message" role="status">{{ mensaje }}</p>
      <p v-if="cargando" class="state-message">Preparando el menú...</p>
      <p v-else-if="error" class="state-message">{{ error }}</p>
      <div v-else class="product-grid">
        <ProductoCard
          v-for="producto in destacados"
          :key="producto.id"
          :producto="producto"
          @agregar="agregarAlPedido"
        />
      </div>
    </section>

    <section class="closing-banner">
      <div class="container closing-inner">
        <div>
          <div class="eyebrow">PLAN PERFECTO</div>
          <h2>¿Noche de pizza?</h2>
          <p>Vos elegís la pizza. Nosotros ponemos el sabor.</p>
        </div>
        <RouterLink class="button button-light" to="/pizzas"
          >Elegir mi pizza <span>→</span></RouterLink
        >
      </div>
    </section>
  </div>
</template>
