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
  const filtered = useFiltering();
  const products = useProducts();
  const currentPage = useCurrentPage();
  const perPage = usePerPage();
  const onPageChange = (page) => {
    currentPage.value = page;
    const start = Math.floor(perPage.value * currentPage.value - perPage.value)
    const end = Math.floor(perPage.value * currentPage.value)

    products.value = originalProducts.value.slice(start, end)
  }

  const totalPages = computed(() => {
    return Math.ceil(originalProducts.value.length / perPage.value)
  })

  setStartingProducts();
</script>

<template>
  <div v-if="products.length" class="items-container">
    <template v-for="product in products" :key="product.ProductID">
      <Product :product="product"/>
    </template>
  </div>
  <div v-if="products.length && filtered === false" class="pagination-container">
    <pagination
      v-if="originalProducts.length > perPage"
      :totalPages="totalPages"
      :perPage="perPage"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>