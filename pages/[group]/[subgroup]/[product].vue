<style scoped>
  .product {
    display: flex;
    gap: 30px;
  }

  .left {
    width: 40%;
  }

  .right {
    width: 60%;
  }

  .info-box {
    padding: 15px;
    border: 1px solid var(--color-border);
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }
</style>

<script setup>
  const route = useRoute()
  const product = useProduct();
  const cart = useCart();
  const quantity = ref(1);
  const cartOffCanvas = useCartOffcanvas();
  const response = await getCategoryProducts(route.params.group, route.params.subgroup);

  product.value = response.value.filter((item) => {
    return item.ProductID.toString() === route.params.product
  })

  const productName = computed(() => {
    if (product.value[0].SubDescription) {
      return product.value[0].MainDescription + ' ' + product.value[0].SubDescription
    } else {
      return product.value[0].MainDescription 
    }
  })

  const addProduct = (qty) => {
    quantity.value = 1;
    if (cart.value.find(e => e.id === product.value[0].ProductID)) {
      // If product is already in cart then...
      cart.value.filter((e => e.id === product.value[0].ProductID)).map(item => {
        // Add one to current quantity
        item.quantity = item.quantity + qty
      })
      cartOffCanvas.value = true
    } else {
      // Else push new product to cartproducts
      cart.value.push({
        'id': product.value[0].ProductID,
        'name': productName,
        'price': product.value[0].ProductPrices[0].Price,
        'quantity': qty
      })
      cartOffCanvas.value = true
    }
  }

  // console.log(toRaw(product.value))
</script>


<template>
  <div v-if="product.length">
    <article v-for="item in product" :key="item.ProductID" class="product">
      <div class="column left">
        <template v-if="item.ProductPictures.length">
          <img :src="item.ProductPictures[0].Url" class="image"/>
        </template>
      </div>
      <div class="column right">
        <div class="info-box">
          <h1 class="title">
            {{ productName }}
          </h1>
          <div class="product-price">
            <Price :price="item.ProductPrices[0].Price"/>
          </div>
          <div class="button-wrapper">
            <div class="quantity-controller">
              <button @click="quantity > 1 ? quantity-- : ''" type="button" class="qty-btn qty-btn--minus">-</button>
              <input type="number" v-model="quantity" class="quantity">
              <button @click="quantity++" type="button" class="qty-btn qty-btn--add">+</button>
            </div>
            <Button @click="addProduct(quantity)">In winkelwagen</Button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>