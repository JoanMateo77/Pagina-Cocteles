<script setup>
import { ref, computed } from 'vue'
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import { useCartStore } from './stores/cart'

const showCart = ref(false)
const cart = useCartStore()
const totalItems = computed(() => cart.totalItems)
function toggleCart() { showCart.value = !showCart.value }
</script>

<template>
  <div class="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
    <nav class="bg-white dark:bg-gray-800 shadow-sm w-full">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="text-xl font-bold">Cocteles</div>
          <ul class="hidden sm:flex gap-4 text-sm">
            <li><a href="#inicio" class="hover:underline">Inicio</a></li>
            <li><a href="#vision" class="hover:underline">Visión y Misión</a></li>
            <li><a href="#sobre" class="hover:underline">Sobre Nosotros</a></li>
            <li><a href="#productos" class="hover:underline">Productos</a></li>
          </ul>
        </div>
        <div class="flex items-center gap-3">
          <button class="relative inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-md" @click="toggleCart">
            <span>Carrito</span>
            <span class="bg-white text-indigo-600 rounded-full px-2 text-xs">{{ totalItems }}</span>
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 py-8">
      <section id="inicio" class="hero py-12 text-center">
        <h1 class="text-3xl font-extrabold">Bienvenido a la Tienda de Cocteles</h1>
        <p class="mt-3 text-gray-600 dark:text-gray-300">Explora nuestra selección y añade tus favoritos al carrito.</p>
      </section>

      <section id="vision" class="content py-8">
        <h2 class="text-2xl font-semibold">Visión y Misión</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Nuestra visión es llevar cocteles de calidad a todos los hogares. Nuestra misión es ofrecer recetas auténticas y fáciles de preparar.</p>
      </section>

      <section id="sobre" class="content py-8">
        <h2 class="text-2xl font-semibold">Sobre Nosotros</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Somos un equipo apasionado por la mixología que quiere compartir sabores y experiencias.</p>
      </section>

      <ProductList />
    </main>

    <Cart :visible="showCart" @close="showCart = false" />
  </div>
</template>

<style scoped>
.navbar{display:flex;align-items:center;justify-content:space-between;padding:1rem 0}
.brand{font-weight:700;font-size:1.2rem}
.nav-links{list-style:none;display:flex;gap:1rem;padding:0;margin:0}
.nav-links a{color:inherit;text-decoration:none}
.nav-actions{display:flex;align-items:center;gap:.5rem}
.cart-btn{background:#646cff;color:white;border:none;padding:.4rem .7rem;border-radius:8px;cursor:pointer}
.hero{padding:2rem 0}
.content{padding:1rem 0}
main{max-width:1100px;margin:0 auto}
:root{scroll-behavior:smooth}
</style>
