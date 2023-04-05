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
  const { data } = await useFetch('https://api.dekamarkt.nl/v1/assortmentcache/group/55/103/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd')

  const filter = () => {
    data.value = data.value.filter((item) => item.MainDescription === 'Bastogne');
  }
</script>

<template>
  <div class="container">
    <div class="items-container">
      <div>
        <button @click="filter">Filter bastogne</button>
      </div>
      <div v-for="product in data" :key="product.ProductID" class="item">
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
