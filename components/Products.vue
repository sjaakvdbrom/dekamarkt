<style scoped>
  .items-container {
    --flex-gap: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: var(--flex-gap);
  }

  .item {
    --flex-items: 1;
    width: calc((100% / var(--flex-items)) - (((var(--flex-items) - 1) / var(--flex-items)) * var(--flex-gap)));
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5)
  }

  .image {
    object-fit: contain;
    height: 150px;
    width: 100%;
  }

  .title {
    display: flex;
    column-gap: 5px;
    font-size: 16px;
    font-weight: bold;
  }

  @media (min-width: 600px) {
    .item {
        --flex-items: 2;
    }
  }

  @media (min-width: 940px) {
    .item {
        --flex-items: 3;
    }
  }

  @media (min-width: 1200px) {
    .item {
        --flex-items: 4;
    }
  }
</style>

<script setup>
const props = defineProps(['products'])
</script>

<template>
  <div class="items-container">
    <article v-for="product in props.products" :key="product.ProductID" class="item">
      <img :src="product.ProductPictures[0].Url" class="image"/>
      <ul>
        <h2 class="title">
          <span v-if="product.MainDescription">{{product.MainDescription}}</span>
          <span v-if="product.SubDescription">{{product.SubDescription}}</span>
          <span v-if="product.CommercialContent">{{product.CommercialContent}}</span>
        </h2>
        
        <li>{{ product.Brand }}</li>
        <li v-for="groups in product.WebSubGroups" :key="groups.WebSubGroupID">
          {{ groups.Description }}
        </li>
      </ul>
    </article>
  </div>
</template>