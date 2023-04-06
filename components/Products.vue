<style scoped>
  .item {
    width: 25%;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5)
  }
</style>

<script setup>
const props = defineProps(['products'])
</script>

<template>
  <div v-for="product in props.products" :key="product.ProductID" class="item">
    <ul>
      <li>{{product.MainDescription}}</li>
      <li v-if="product.SubDescription">{{product.SubDescription}}</li>
      <li>{{ product.Brand }}</li>
      <li v-for="groups in product.WebSubGroups" :key="groups.WebSubGroupID">
        {{ groups.Description }}
      </li>
    </ul>
  </div>
</template>