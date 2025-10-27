<script setup>
import { ref } from 'vue'

const props = defineProps({ 
  item: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['update', 'remove'])
const qty = ref(props.item.quantity)

function inc() { 
  qty.value++
  emits('update', props.item.id, qty.value) 
}

function dec() { 
  if (qty.value > 1) { 
    qty.value--
    emits('update', props.item.id, qty.value) 
  } 
}

function remove() { 
  emits('remove', props.item.id) 
}
</script>

<template>
  <div class="flex gap-4 p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
    <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg"/>
    <div class="flex-1 min-w-0">
      <h4 class="font-medium text-gray-900 dark:text-gray-100">{{ item.name }}</h4>
      <div class="text-gray-600 dark:text-gray-300 mt-1">${{ (item.price * item.quantity).toFixed(2) }}</div>
      <div class="flex items-center gap-2 mt-2">
        <button 
          @click="dec" 
          class="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
        >-</button>
        <input 
          type="number" 
          v-model.number="qty" 
          @change="emits('update', item.id, qty)" 
          min="1" 
          class="w-16 text-center border rounded px-2 py-1"
        />
        <button 
          @click="inc" 
          class="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
        >+</button>
        <button 
          @click="remove" 
          class="ml-2 px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind classes manejan todo el estilo */
</style>
