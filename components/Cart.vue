<style scoped>
  .cart {
    width: 100%;
    margin-bottom: 30px;
  }

  .cart-product:not(:last-of-type) {
    margin-bottom: 10px;
  }

  .totals {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .total {
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
  <Offcanvas>
    <div v-if="cart.length">
      <h2 class="title">Winkelwagen</h2>
      <div>
        <table class="cart">
          <CartItem v-for="product in cart" :key="product.id * product.quantity" :product="product"/>
        </table>
        <div class="totals">
          <h3 class="total">Totaal</h3>
          <Price size="xl" :price="CartTotalPrice" :key="CartTotalPrice" />
        </div>
      </div>
    </div>
  </Offcanvas>
</template>