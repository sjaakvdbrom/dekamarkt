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
  .active {
    font-weight: bold;
  }

  .tabs {
    margin-bottom: 30px;
  }

  .trigger {
    position: relative;
    padding: 10px 15px;
    border: none;
    background-color: #fff;
    border: 1px solid #dedede;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    font-weight: 600;
  }

  .trigger::after {
    content: '';
    position: absolute;
    z-index: 3;
    height: 18px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    transform: translateY(50%);
  }

  .tab {
    position: relative;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #dedede;
    border-radius: 0 5px 5px 5px;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
  }

  .title {
    font-size: 18px;
  }

  .filter-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .filter-label:hover {
    display: inline-block;
    text-decoration: underline;
    cursor: pointer;
  }

  .filter:not(:last-of-type) {
    margin-bottom: 10px;
  }

  .reset {
    margin-top: 15px;
  }
</style>

<script setup>
  const filtered = ref(false)
  const originalProducts = ref([]);
  const products = ref([]);
  const brands = ref([]);
  const cartProducts = ref([]);
  const brandButton = ref(null)
  
  const getProducts = async () => {
    // TODO: hide api key
    const { data } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/55/103/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)
    originalProducts.value = toRaw(data.value)
    products.value = toRaw(data.value)
    brands.value = [...new Set(toRaw(data.value).map((item) => item.Brand))]
    console.log(toRaw(data.value))
  }
  
  const filter = (event, brand) => {
    toRaw(brandButton.value).map(item => item.classList.remove('active'))
    // TODO: allow for filtering multiple conditions
    filtered.value = true
    products.value = originalProducts.value.filter((item) => item.Brand === brand);
    event.target.classList.toggle('active')
  }

  const reset = () => {
    toRaw(brandButton.value).map(item => item.classList.remove('active'))
    filtered.value = false
    products.value = originalProducts.value;
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
    <div class="filters">
      <h2 class="title">Filter op</h2>
      <div class="tabs">
        <template v-if="brands">
          <button class="trigger">Merk</button>
            <div class="tab">
              <ul class="filter-list">
                <li v-for="(brand, index) in brands" :key="index" class="filter">
                  <label @click="event => filter(event, brand)" ref="brandButton" class="filter-label">{{ brand }}</label>
                </li>
              </ul>
              <div v-if="filtered === true" class="reset">
                <Button @click="reset">Reset filters</Button>
              </div>
            </div>
        </template>
      </div>
    </div>
    <Products v-if="products.length" :products="products" @addtocart="(id, qty) => addProduct(id, qty)" />    
  </div>
</template>
