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
    <!-- TODO: get category name -->
    <h1>Koeken</h1>
    <Cart />
    <FilterBy />
    <Grid />    
  </div>
</template>
