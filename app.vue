<style scoped>
  .container {
    margin: 0 auto;
    max-width: 1200px;
  }

  * {
    box-sizing: border-box;
  }
  .items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .item {
    width: 25%;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5)
  }
</style>

<script setup>
  const filtered = ref(false)
  
  const { data: products } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/55/103/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)
  const brands = [...new Set(products.value.map((item) => item.Brand))];

  const filter = (brand) => {
    filtered.value = true
    products.value = products.value.filter((item) => item.Brand === brand);
  }

  const reset = () => {
    filtered.value = false
    // reset
  }

</script>

<template>
  <div class="container">
    <div v-if="products">
      <div v-for="(brand, index) in brands" :key="index">
        <button @click="filter(brand)">{{ brand }}</button>
      </div>
      <button v-if="filtered === true" @click="reset">Reset filters</button>
    </div>
    <div class="items-container">
      <div v-for="product in products" :key="product.ProductID" class="item">
        <ul>
          <li>{{product.MainDescription}}</li>
          <li v-if="product.SubDescription">{{product.SubDescription}}</li>
          <li>{{ product.Brand }}</li>
          <li v-for="groups in product.WebSubGroups" :key="groups.WebSubGroupID">
            {{ groups.Description }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
