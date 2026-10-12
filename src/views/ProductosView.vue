<script setup>
import { computed, ref } from "vue";
import ProductoCard from "../components/ProductoCard.vue";
import { useProductos } from "../composables/useProductos";
import { useCarrito } from "../composables/useCarrito";

const { productos, cargando, error } = useProductos();
const { agregar } = useCarrito();

const busqueda = ref("");
const categoria = ref("Todas");
const categorias = ["Todas", "Clásicas", "Especiales"];
const mensaje = ref("");

const productosFiltrados = computed(() => {
  return productos.value.filter((producto) => {
    const coincideCategoria =
      categoria.value === "Todas" || producto.categoria === categoria.value;

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.value.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });
});

function agregarAlPedido(producto) {
  console.log("1. Clic recibido:", producto.nombre);
  agregar(producto);
  console.log("2. Producto agregado al carrito");
  mensaje.value = `${producto.nombre} se agregó al carrito.`;
}
</script>

<template>
  <section class="container page-section">
    <div class="eyebrow">HECHAS PARA COMPARTIR</div>
    <h1 class="page-title">Nuestro menú<span>.</span></h1>
    <p class="page-intro">
      Clásicas que nunca fallan y combinaciones para descubrir tu nueva
      favorita.
    </p>

    <p v-if="mensaje" class="state-message" role="status">
      {{ mensaje }}
    </p>

    <div class="menu-tools">
      <div class="category-tabs" aria-label="Filtrar por categoría">
        <button
          v-for="item in categorias"
          :key="item"
          type="button"
          :class="{ active: categoria === item }"
          @click="categoria = item"
        >
          {{ item }}
        </button>
      </div>

      <input
        v-model="busqueda"
        class="search-input"
        type="search"
        placeholder="Buscar una pizza..."
        aria-label="Buscar una pizza"
      />
    </div>

    <p v-if="cargando" class="state-message">Preparando el menú...</p>
    <p v-else-if="error" class="state-message">{{ error }}</p>

    <div v-else-if="productosFiltrados.length" class="product-grid menu-grid">
      <ProductoCard
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :producto="producto"
        @agregar="agregarAlPedido"
      />
    </div>

    <p v-else class="state-message">
      No encontramos pizzas con esos filtros. Probá con otra búsqueda.
    </p>
  </section>
</template>
