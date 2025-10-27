<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import CartItem from './CartItem.vue'

const props = defineProps({ visible: Boolean })
const emits = defineEmits(['close'])
const cart = useCartStore()
const total = computed(() => cart.totalPrice.toFixed(2))

const checkoutMode = ref(false)
const name = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const error = ref('')
const isSending = ref(false)
const success = ref('')

function close() { emits('close'); resetForm() }
function clearAll() { cart.clearCart() }
function update(id, qty) { cart.updateQty(id, qty) }
function remove(id) { cart.removeItem(id) }

function startCheckout() {
  if (cart.items.length === 0) {
    error.value = 'El carrito está vacío.'
    return
  }
  checkoutMode.value = true
}

function resetForm() {
  checkoutMode.value = false
  name.value = ''
  email.value = ''
  phone.value = ''
  address.value = ''
  error.value = ''
  success.value = ''
  isSending.value = false
}

function validateEmail(e) {
  return /\S+@\S+\.\S+/.test(e)
}

function validatePhone(p) {
  return /^\+?[\d\s-]{10,}$/.test(p)
}

function submitOrder() {
  error.value = ''
  if (!name.value.trim()) { error.value = 'Nombre requerido'; return }
  if (!validateEmail(email.value)) { error.value = 'Email inválido'; return }
  if (!validatePhone(phone.value)) { error.value = 'Teléfono inválido (mínimo 10 dígitos)'; return }
  // construir cuerpo del correo con los detalles del pedido
  const lines = []
  lines.push(`Nombre: ${name.value}`)
  lines.push(`Email: ${email.value}`)
  lines.push(`Teléfono: ${phone.value}`)
  lines.push(`Dirección: ${address.value}`)
  lines.push('')
  lines.push('Pedido:')
  cart.items.forEach(it => {
    lines.push(`- ${it.name} x${it.quantity} — $${(it.price * it.quantity).toFixed(2)}`)
  })
  lines.push('')
  lines.push(`Total: $${total.value}`)

  // Enviar al backend para que haga el envío por SMTP
  const payload = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    items: cart.items,
    total: total.value
  }

  isSending.value = true
  success.value = ''

  fetch('http://localhost:3000/api/send-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(async res => {
      if (!res.ok) {
        const data = await res.json().catch(()=>({}))
        throw new Error(data.error || 'Error al enviar la orden')
      }
      return res.json()
    })
    .then(() => {
      // vaciar carrito y mostrar confirmación
      cart.clearCart()
      success.value = 'Orden enviada correctamente. Te contactaremos pronto.'
      // cerrar modal después de una breve espera
      setTimeout(() => {
        resetForm()
        emits('close')
      }, 1200)
    })
    .catch(err => {
      console.error(err)
      error.value = err.message || 'Error al enviar la orden'
    })
    .finally(() => { isSending.value = false })
}
</script>

<template>
  <div v-if="props.visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white dark:bg-gray-900 w-11/12 max-w-2xl rounded-lg shadow-lg p-4">
      <header class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-semibold">Carrito</h3>
        <div class="flex items-center gap-2">
          <button class="text-sm text-gray-500 hover:text-gray-700" @click="close">Cerrar</button>
        </div>
      </header>

      <div class="max-h-64 overflow-auto mb-3">
        <div v-if="cart.items.length===0" class="text-gray-600">El carrito está vacío.</div>
        <div v-else class="space-y-2">
          <CartItem v-for="it in cart.items" :key="it.id" :item="it" @update="update" @remove="remove" />
        </div>
      </div>

      <div class="flex items-center justify-between mt-2">
        <div class="text-lg font-bold">Total: ${{ total }}</div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1 rounded border text-sm" @click="clearAll">Vaciar</button>
          <button class="px-3 py-1 rounded bg-green-500 text-white text-sm" @click="startCheckout">Comprar</button>
        </div>
      </div>

      <!-- Checkout form -->
      <form v-if="checkoutMode" @submit.prevent="submitOrder" class="mt-4 border-t pt-4">
        <h4 class="font-medium mb-2">Formulario de envío</h4>
        <div class="space-y-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input 
              v-model="name" 
              type="text" 
              placeholder="Nombre *" 
              required
              class="w-full border rounded px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
            <input 
              v-model="phone" 
              type="tel" 
              placeholder="Teléfono *" 
              required
              class="w-full border rounded px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
            <input 
              v-model="email" 
              type="email" 
              placeholder="Email *" 
              required
              class="w-full border rounded px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>
          <textarea 
            v-model="address" 
            placeholder="Dirección de entrega" 
            class="w-full border rounded px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            rows="3"
          ></textarea>
          <div class="flex flex-col sm:flex-row items-center justify-end gap-2 mt-4">
            <button type="button" class="w-full sm:w-auto px-4 py-2 rounded border" @click="checkoutMode = false">Cancelar</button>
            <button
              type="submit"
              :disabled="isSending"
              class="w-full sm:w-auto px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="!isSending">Enviar orden</span>
              <span v-else>Enviando...</span>
            </button>
          </div>
          <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
          <div v-if="success" class="text-green-600 text-sm">{{ success }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* keep minimal custom styling; layout mainly via Tailwind */
</style>
