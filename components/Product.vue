<style scoped>
.item {
    --flex-items: 1;
    display: flex;
    flex-direction: column;
    width: calc((100% / var(--flex-items)) - (((var(--flex-items) - 1) / var(--flex-items)) * var(--flex-gap)));
    padding: 15px;
    border: 1px solid var(--color-border);
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
    font-size: var(--font-size-default);
    font-weight: bold;
  }

  .muted {
    margin-top: auto;
    margin-bottom: 10px;
  }

  .button {
    width: 100%;
  }

  .product-price {
    margin-bottom: 15px;
  }

  .title-link {
    display: inline-block;
  }

  .title-link:not(:hover) {
    text-decoration: none;
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
  const route = useRoute()
  const props = defineProps(['product']);
  const cart = useCart();
  const quantity = ref(1);
  const productName = computed(() => {
    if (props.product.SubDescription) {
      return props.product.MainDescription + ' ' + props.product.SubDescription
    } else {
      return props.product.MainDescription 
    }
  })
  const productPrice = props.product.ProductPrices[0].Price
  const productId = props.product.ProductID;
  const cartOffCanvas = useCartOffcanvas();

  const addProduct = (qty) => {
    quantity.value = 1;
    if (cart.value.find(e => e.id === productId)) {
      // If product is already in cart then...
      cart.value.filter((e => e.id === productId)).map(item => {
        // Add one to current quantity
        item.quantity = item.quantity + qty
      })
      cartOffCanvas.value = true
    } else {
      // Else push new product to cartproducts
      cart.value.push({
        'id': productId,
        'name': productName,
        'price': productPrice,
        'quantity': qty
      })
      cartOffCanvas.value = true
    }
  }
</script>

<template>
  <article class="item">
    <NuxtLink :to="`/${route.params.group}/${route.params.subgroup}/${productId}`" class="image-link">
      <img :src="product.ProductPictures[0].Url" class="image"/>
    </NuxtLink>
    <div class="title-container">
      <NuxtLink :to="`/${route.params.group}/${route.params.subgroup}/${productId}`" class="title-link">
        <h2 class="title">
          {{productName}} 
        </h2>
      </NuxtLink>
    </div>
    <div v-if="product.CommercialContent" class="muted">{{product.CommercialContent}}</div>
    <div class="product-price">
      <Price :price="productPrice"/>
    </div>
    <div class="button-wrapper">
      <div class="quantity-controller">
        <button @click="quantity > 1 ? quantity-- : ''" type="button" class="qty-btn qty-btn--minus">-</button>
        <input type="number" v-model="quantity" class="quantity">
        <button @click="quantity++" type="button" class="qty-btn qty-btn--add">+</button>
      </div>
      <Button @click="addProduct(quantity)">In winkelwagen</Button>
    </div>
  </article>
</template>