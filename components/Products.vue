<style scoped>
  .items-container {
    --flex-gap: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: var(--flex-gap);
  }
</style>

<script setup>
  const props = defineProps(['products']);
</script>

<template>
  <div class="items-container">
    <template v-for="product in props.products" :key="product.ProductID">
      <Product :product="product" @click="$emit('addtocart', product.ProductID)"/>
    </template>
  </div>
</template>