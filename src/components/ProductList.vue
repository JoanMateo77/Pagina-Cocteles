<script setup>
import products from '../data/products'
import ProductCard from './ProductCard.vue'
</script>

<template>
  <section id="productos" class="py-12">
    <h2 class="text-2xl font-bold mb-6 text-center">Nuestros Cocteles</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<style scoped>
/* Tailwind classes manejan todo el estilo */
</style>
