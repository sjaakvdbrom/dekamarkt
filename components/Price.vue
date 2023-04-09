<style scoped>
  .price {
    display: flex;
    color: #000;
    font-weight: bold;
    line-height: 1;
  }
  .number {
    font-size: 27px;
    line-height: 1;
    letter-spacing: -1px;
  }

  .decimals {
    font-size: 14px;
    line-height: 1;
    vertical-align: top;
    transform: translateX(-0.2em) translateY(0.15em);
  }
</style>

<script setup>
  const props = defineProps(['price'])
  const number = (props.price+"").split(".")[0] + '.'
  const decimals = (props.price+"").split(".")[1]
</script>

<template>
  <div v-if="price" :data-price="price" class="price">
    <span v-if="number" class="number">{{ number }}</span>
    <span v-if="decimals" class="decimals">{{ decimals }}</span>
  </div>
</template>