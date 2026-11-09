<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCarrito } from "../composables/useCarrito";
import { useAuth } from "../composables/useAuth";
import { usePedidos } from "../composables/usePedidos";

const { items, cantidadTotal, total, aumentar, disminuir, eliminar, vaciar } =
  useCarrito();
const { usuario } = useAuth();
const { registrarPedido, cargando } = usePedidos();
const router = useRouter();

const mensajeExito = ref("");
const errorCompra = ref("");

function formatoPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
}

async function confirmarCompra() {
  mensajeExito.value = "";
  errorCompra.value = "";

  if (!usuario.value) {
    await router.push("/login");
    return;
  }

  try {
    await registrarPedido({
      cliente_id: usuario.value.id,
      total: total.value,
      items: items.value,
    });

    vaciar();
    mensajeExito.value = "¡Tu compra fue confirmada correctamente!";
  } catch (e) {
    console.error("Error al confirmar compra:", e);
    errorCompra.value =
      e.message || "No se pudo confirmar la compra. Intentá nuevamente.";
  }
}
</script>

<template>
  <section class="container page-section">
    <div class="eyebrow">TU PEDIDO</div>
    <h1 class="page-title">Tu carrito<span>.</span></h1>

    <p v-if="mensajeExito" class="admin-message admin-success" role="status">
      {{ mensajeExito }}
    </p>

    <p v-if="errorCompra" class="admin-message admin-error" role="alert">
      {{ errorCompra }}
    </p>

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
          <button
            type="button"
            class="button cart-confirm-button"
            :disabled="cargando"
            @click="confirmarCompra"
          >
            {{ cargando ? "Confirmando..." : "Confirmar compra →" }}
          </button>
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
