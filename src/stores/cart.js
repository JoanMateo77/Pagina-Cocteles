import { defineStore } from 'pinia'

const STORAGE_KEY = 'cocteles_cart_v1'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  }),
  getters: {
    totalItems: (state) => state.items.reduce((s, i) => s + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((s, i) => s + i.quantity * i.price, 0),
  },
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    addItem(product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.persist()
    },
    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id)
      this.persist()
    },
    updateQty(id, qty) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return
      item.quantity = Math.max(1, Math.floor(qty))
      this.persist()
    },
    clearCart() {
      this.items = []
      this.persist()
    },
  },
})
