<style scoped>
  .cart-product td {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-border);
  }

  .price {
    display: flex;
    justify-content: flex-end;
  }
</style>

<script setup>
  const props = defineProps(['product'])
  const totalPrice = () => {
    const total = props.product.price * props.product.quantity
    return total.toFixed(2)
  }
</script>

<template>
  <tr class="cart-product">
    <td>{{ product.quantity }}x</td>
    <td>{{ product.name }}</td>
    <td class="price"><Price :price="totalPrice()"/></td>
  </tr>
</template>
