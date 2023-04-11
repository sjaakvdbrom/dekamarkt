<style scoped>
  .price {
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: 940px) {
    .cart-product td {
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--color-border);
    }
  }

  @media (max-width: 939px) {
    .cart-product {
      display: flex;
      flex-wrap: wrap;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--color-border);
    }

    .price {
      margin-top: 10px;
      width: 100%;
    }
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
