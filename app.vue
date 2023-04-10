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
  .cart {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #dedede;
    border-radius: 5px;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
  }

  .cart-product:not(:last-of-type) {
    margin-bottom: 10px;
  }
</style>

<script setup>
  const originalProducts = useOriginalProducts();
  const products = useProducts();
  const brands = useBrands();
  const cartProducts = ref([]);
  
  const getProducts = async () => {
    // TODO: hide api key
    const { data } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/55/103/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)
    originalProducts.value = toRaw(data.value)
    products.value = toRaw(data.value)
    brands.value = [...new Set(toRaw(data.value).map((item) => item.Brand))]
    console.log(toRaw(data.value))
  }
  
  const addProduct = (id, qty) => {
    if (cartProducts.value.find(e => e.id === id)) {
      // If product is already in cart then...
      cartProducts.value.filter((e => e.id === id)).map(item => {
        // Add one to current quantity
        item.quantity = item.quantity + qty
      })
    } else {
      // Else push new product to cartproducts
      cartProducts.value.push({
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
    <div v-if="cartProducts.length">
      <h2 class="title">Winkelwagen</h2>
      <div class="cart">
        <div v-for="product in cartProducts" :key="product.id" class="cart-product">
          {{ product.id }} x {{ product.quantity }}
        </div>
      </div>
    </div>
    <FilterBy />
    <Grid v-if="products.length" :products="products" @addtocart="(id, qty) => addProduct(id, qty)" />    
  </div>
</template>
