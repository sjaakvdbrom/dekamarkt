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
    border: 1px solid #e5e5e5;
    border-radius: 25px;
  }

  .image {
    object-fit: contain;
    height: 200px;
    width: 100%;
  }

  .title {
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
      <img v-if="product.ProductPictures.length" :src="product.ProductPictures[0].Url" class="image"/>
      <h2 class="title">
        {{product.MainDescription}} {{product.SubDescription}} {{product.CommercialContent}}
      </h2>
      <ul>
        <li>{{ product.Brand }}</li>
        <li>{{ product.SubGroup.Description }}</li>
        <li v-for="groups in product.WebSubGroups" :key="groups.WebSubGroupID">
          {{ groups.Description }}
        </li>
        <li v-if="product.ProductPrices.length">{{ product.ProductPrices[0].Price }}</li>
        <li v-if="product.ProductOffers.length">{{ product.ProductOffers[0].Offer.OfferPrice }}</li>
      </ul>
    </article>
  </div>
</template>