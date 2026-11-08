import { useCarritoStore } from '../stores/carritoStore'
import { storeToRefs } from 'pinia'

export function useCarrito() {
  const store = useCarritoStore()

  const { items, cantidadTotal, total } = storeToRefs(store)

  return {
    items,
    cantidadTotal,
    total,
    agregar: store.agregar,
    aumentar: store.aumentar,
    disminuir: store.disminuir,
    eliminar: store.eliminar,
    vaciar: store.vaciar
  }
}