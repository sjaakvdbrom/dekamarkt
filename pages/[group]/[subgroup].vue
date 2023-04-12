<style>
  @import 'assets/app.css';
</style>

<script setup>
  const route = useRoute()
  const originalProducts = useOriginalProducts();
  const products = useProducts();
  const brands = useBrands();
  const response = await getCategoryProducts(route.params.group, route.params.subgroup);

  originalProducts.value = response.value
  products.value = response.value
  brands.value = [...new Set(response.value.map((item) => item.Brand))]

</script>

<template>
  <div class="page-container container">
    <template v-if="!route.params.product">
      <!-- TODO: get category name -->
      <h1>Koeken</h1>
      <FilterBy />
      <Grid />
    </template>
    <template v-else>
      <NuxtPage />
    </template>
  </div>
</template>
