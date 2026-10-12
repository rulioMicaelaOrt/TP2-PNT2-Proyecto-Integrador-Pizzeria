import { ref, computed } from "vue";

const items = ref([]);

export function useCarrito() {
  function agregar(producto) {
    const existente = items.value.find((item) => item.id === producto.id);

    if (existente) {
      existente.cantidad++;
    } else {
      items.value.push({
        ...producto,
        cantidad: 1,
      });
    }
  }

  function aumentar(id) {
    const item = items.value.find((producto) => producto.id === id);
    if (item) item.cantidad++;
  }

  function disminuir(id) {
    const item = items.value.find((producto) => producto.id === id);

    if (item) {
      item.cantidad--;

      if (item.cantidad <= 0) {
        eliminar(id);
      }
    }
  }

  function eliminar(id) {
    items.value = items.value.filter((producto) => producto.id !== id);
  }

  function vaciar() {
    items.value = [];
  }

  const cantidadTotal = computed(() =>
    items.value.reduce((total, item) => total + item.cantidad, 0),
  );

  const total = computed(() =>
    items.value.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
  );

  return {
    items,
    cantidadTotal,
    total,
    agregar,
    aumentar,
    disminuir,
    eliminar,
    vaciar,
  };
}
