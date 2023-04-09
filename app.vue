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

<style scoped>
  .active {
    font-weight: bold;
  }
</style>

<script setup>
  const filtered = ref(false)
  const originalProducts = ref([]);
  const products = ref([]);
  const brands = ref([]);
  const cartProducts = ref([]);
  
  const getProducts = async () => {
    const { data } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/55/103/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)
    originalProducts.value = toRaw(data.value)
    products.value = toRaw(data.value)
    brands.value = [...new Set(toRaw(data.value).map((item) => item.Brand))]
    // console.log(toRaw(data.value))
  }
  
  const filter = (event, brand) => {
    filtered.value = true
    products.value = originalProducts.value.filter((item) => item.Brand === brand);
    event.target.classList.toggle('active')
  }

  const reset = () => {
    filtered.value = false
    products.value = originalProducts.value;
  }

  const addProduct = (event, n) => {
    if (cartProducts.value.find(e => e.id === event)) {
      // If product is already in cart then...
      cartProducts.value.filter((e => e.id === event)).map(item => {
        // Add one to current quantity
        item.quantity = item.quantity + n
      })
    } else {
      // Else push new product to cartproducts
      cartProducts.value.push({
        'id': event,
        'quantity': n
      })
    }
  }

  onMounted(getProducts);

</script>

<template>
  <div class="container" v-if="products.length">
    <div>
      <div v-for="(brand, index) in brands" :key="index">
        <button @click="event => filter(event, brand)">{{ brand }}</button>
      </div>
      <button v-if="filtered === true" @click="reset">Reset filters</button>
    </div>
    <div v-if="cartProducts.length">
      <div v-for="product in cartProducts" :key="product.id">
        {{ product.id }} x {{ product.quantity }}
      </div>
    </div>
    <Products v-if="products.length" :products="products" @addtocart="(e, n) => addProduct(e, n)" />    
  </div>
</template>
