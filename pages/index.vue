<style>
  @import "normalize.css";

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter';
  }

  .container {
    margin: 0 auto;
    max-width: 1200px;
  }

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }
</style>

<script setup>
  const originalProducts = useOriginalProducts();
  const products = useProducts();
  const brands = useBrands();
  const { data } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/55/103/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)

  const getProducts = async () => {
    originalProducts.value = toRaw(data.value)
    products.value = toRaw(data.value)
    brands.value = [...new Set(toRaw(data.value).map((item) => item.Brand))]
    // console.log(toRaw(data.value))
  }
  
  onMounted(getProducts);

</script>

<template>
  <div class="container">
    <!-- TODO: get category name -->
    <h1>Koeken</h1>
    <Cart />
    <FilterBy />
    <Grid />    
  </div>
</template>
