<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({ 
  product: {
    type: Object,
    required: true
  }
})

const cart = useCartStore()

function add() {
  cart.addItem({ 
    id: props.product.id, 
    name: props.product.name, 
    price: props.product.price, 
    image: props.product.image 
  })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
    <img :src="product.image" :alt="product.name" class="w-full h-48 sm:h-56 object-cover"/>
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{{ product.description }}</p>
      <div class="flex items-center justify-between">
        <div class="text-lg font-bold">${{ product.price.toFixed(2) }}</div>
        <button 
          @click="add"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind classes manejan todo el estilo */
</style>