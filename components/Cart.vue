<style scoped>
  .cart {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
  }

  .cart-product:not(:last-of-type) {
    margin-bottom: 10px;
  }
</style>

<script setup>
  const cart = useCart();
  const CartTotalPrice = ref(0)
  const setCartTotalPrice = () => {
    CartTotalPrice.value = cart.value.reduce((total, item) => item.price * item.quantity + total, 0).toFixed(2)
  }

  onMounted(setCartTotalPrice)

  watch(cart.value, () => {
    setCartTotalPrice()
  })
</script>

<template>
  <div v-if="cart.length">
    <h2 class="title">Winkelwagen</h2>
    <div class="cart">
      <CartItem v-for="product in cart" :key="product.id * product.quantity" :product="product"/>
      <h3>Totaal</h3>
      <Price size="xl" :price="CartTotalPrice" :key="CartTotalPrice" />
    </div>
  </div>
</template>