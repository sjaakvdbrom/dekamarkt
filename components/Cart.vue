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
</style>

<script setup>
  const cart = useCart();
</script>

<template>
  <div v-if="cart.length">
    <h2 class="title">Winkelwagen</h2>
    <div class="cart">
      <div v-for="product in cart" :key="product.id" class="cart-product">
        {{ product.id }} x {{ product.quantity }}
      </div>
    </div>
  </div>
</template>