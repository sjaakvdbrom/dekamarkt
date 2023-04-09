<style scoped>
.item {
    --flex-items: 1;
    width: calc((100% / var(--flex-items)) - (((var(--flex-items) - 1) / var(--flex-items)) * var(--flex-gap)));
    padding: 15px;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }

  .image-link {
    display: block;
    margin-bottom: 20px;
    text-align: center;
  }

  .image {
    object-fit: contain;
    aspect-ratio: 1;
    max-height: 200px;
    max-width: 100%;
  }

  .title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  .muted {
    margin-bottom: 10px;
    color: #888;
    font-size: 14px;
  }

  .product-price {
    margin-bottom: 15px;
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
  const props = defineProps(['product']);
  const quantity = ref(1);
  const emit = defineEmits(['addtocart'])

  const add = (id, qty) => {
    emit('addtocart', id, qty)
    quantity.value = 1
  }
</script>

<template>
  <article class="item">
      <a class="image-link">
        <img v-if="product.ProductPictures.length" :src="product.ProductPictures[0].Url" class="image"/>
      </a>
      <h2 class="title">
        {{product.MainDescription}} {{product.SubDescription}} 
      </h2>
      <div v-if="product.CommercialContent" class="muted">{{product.CommercialContent}}</div>
      <div class="product-price">
        <Price :price="product.ProductPrices[0].Price"/>
      </div>
      <input type="number" v-model="quantity">
      <Button @click="add(product.ProductID, quantity)">In winkelwagen</Button>
    </article>
</template>