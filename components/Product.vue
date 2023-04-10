<style scoped>
.item {
    --flex-items: 1;
    display: flex;
    flex-direction: column;
    width: calc((100% / var(--flex-items)) - (((var(--flex-items) - 1) / var(--flex-items)) * var(--flex-gap)));
    padding: 15px;
    border: 1px solid #dedede;
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
    margin-top: auto;
    margin-bottom: 10px;
    color: #888;
    font-size: 14px;
  }

  .button {
    width: 100%;
  }

  .product-price {
    margin-bottom: 15px;
  }

  .quantity-controller {
    display: flex;
    margin-bottom: 15px;
  }

  .quantity {
    width: 35px;
    text-align: center;
    appearance: none;
    -moz-appearance: textfield;
    border: 1px solid #dedede;
  }

  .quantity::-webkit-outer-spin-button,
  .quantity::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .qty-btn {
    padding: 8px;
    appearance: none;
    border: none;
    background-color: #dedede;
    cursor: pointer;
  }

  .qty-btn--minus {
    border-radius: 3px 0 0 3px;
  }

  .qty-btn--add {
    border-radius: 0 3px 3px 0;
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

    .button-wrapper {
      display: flex;
      gap: 5px;
    }

    .button-wrapper .button {
      flex: 1;
    }

    .quantity-controller {
      margin-bottom: 0;
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
  const cart = useCart();
  const quantity = ref(1);

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
</script>

<template>
  <article class="item">
      <a v-if="product.ProductPictures.length" class="image-link">
        <img :src="product.ProductPictures[0].Url" class="image"/>
      </a>
      <h2 class="title">
        {{product.MainDescription}} {{product.SubDescription}} 
      </h2>
      <div v-if="product.CommercialContent" class="muted">{{product.CommercialContent}}</div>
      <div class="product-price">
        <Price :price="product.ProductPrices[0].Price"/>
      </div>
      <div class="button-wrapper">
        <div class="quantity-controller">
          <button @click="quantity > 1 ? quantity-- : ''" type="button" class="qty-btn qty-btn--minus">-</button>
          <input type="number" v-model="quantity" class="quantity">
          <button @click="quantity++" type="button" class="qty-btn qty-btn--add">+</button>
        </div>
        <Button @click="addProduct(product.ProductID, quantity)">In winkelwagen</Button>
      </div>
    </article>
</template>