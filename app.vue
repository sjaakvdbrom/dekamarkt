<style>
  @import "normalize.css";

  body {
    margin: 0;
    padding: 20px;
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
  const cart = useCart();
  
  const getProducts = async () => {
    // TODO: hide api key
    const { data } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/55/103/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)
    originalProducts.value = toRaw(data.value)
    products.value = toRaw(data.value)
    brands.value = [...new Set(toRaw(data.value).map((item) => item.Brand))]
    console.log(toRaw(data.value))
  }
  
  const addProduct = (id, qty) => {
    if (cart.value.find(e => e.id === id)) {
      // If product is already in cart then...
      cart.value.filter((e => e.id === id)).map(item => {
        // Add one to current quantity
        item.quantity = item.quantity + qty
      })
    } else {
      // Else push new product to cartproducts
      cart.value.push({
        'id': id,
        'quantity': qty
      })
    }
  }

  onMounted(getProducts);

</script>

<template>
  <div class="container" v-if="products.length">
    <!-- TODO: get category name -->
    <h1>Koeken</h1>
    <Cart />
    <FilterBy />
    <Grid v-if="products.length" :products="products" @addtocart="(id, qty) => addProduct(id, qty)" />    
  </div>
</template>
