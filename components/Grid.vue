<style scoped>
  .items-container {
    --flex-gap: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: var(--flex-gap);
  }
</style>

<script setup>
  const originalProducts = useOriginalProducts();
  const products = useProducts();
  const currentPage = ref(1);
  const perPage = ref(16);
  const onPageChange = (page) => {
    currentPage.value = page;
    const start = perPage.value * currentPage.value - perPage.value
    const end = perPage.value * currentPage.value

    products.value = originalProducts.value.slice(start, end)
  }
  products.value = originalProducts.value.slice(0, perPage.value)
</script>

<template>
  <div v-if="products.length" class="items-container">
    <template v-for="product in products" :key="product.ProductID">
      <Product :product="product"/>
    </template>
    <pagination
      v-if="originalProducts.length > perPage"
      :totalPages="originalProducts.length / perPage"
      :perPage="perPage"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>