import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    items: []
  }),

  getters: {
    cantidadTotal: (state) =>
      state.items.reduce((total, item) => total + item.cantidad, 0),

    total: (state) =>
      state.items.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
      )
  },

  actions: {
    agregar(producto) {
      const existente = this.items.find(
        item => item.id === producto.id
      )

      if (existente) {
        existente.cantidad++
      } else {
        this.items.push({
          ...producto,
          cantidad: 1
        })
      }
    },

    aumentar(id) {
      const item = this.items.find(item => item.id === id)

      if (item) {
        item.cantidad++
      }
    },

    disminuir(id) {
      const item = this.items.find(item => item.id === id)

      if (item && item.cantidad > 1) {
        item.cantidad--
      }
    },

    eliminar(id) {
      this.items = this.items.filter(item => item.id !== id)
    },

    vaciar() {
      this.items = []
    }
  }
})