<style scoped>
  .items-container {
    --flex-gap: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: var(--flex-gap);
  }
</style>

<script setup>
  const products = useProducts();
</script>

<template>
  <div class="items-container">
    <template v-for="product in products" :key="product.ProductID">
      <Product :product="product" @addtocart="(id, qty) => $emit('addtocart', id, qty)"/>
    </template>
  </div>
</template>