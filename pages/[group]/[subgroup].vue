<style>
  @import 'assets/app.css';
</style>

<script setup>
  const route = useRoute()
  const originalProducts = useOriginalProducts();
  const products = useProducts();
  const brands = useBrands();
  const { data } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/${route.params.group}/${route.params.subgroup}/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)

  const getProducts = async () => {
    originalProducts.value = toRaw(data.value)
    products.value = toRaw(data.value)
    brands.value = [...new Set(toRaw(data.value).map((item) => item.Brand))]
  }

  onMounted(getProducts);

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
