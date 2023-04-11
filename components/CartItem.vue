<script setup>
  const props = defineProps(['product'])
  const totalPrice = () => {
    const total = props.product.price * props.product.quantity
    return total.toFixed(2)
  }
</script>

<template>
  <div class="cart-product">
    {{ product.id }} x {{ product.quantity }} = <Price :price="totalPrice()"/>
  </div>
</template>
