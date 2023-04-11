<style scoped>
  .price {
    display: flex;
    color: var(--color-text);
    font-weight: bold;
    font-size: 27px;
    line-height: 1;
  }
  .number {
    line-height: 1;
    letter-spacing: -1px;
  }

  .decimals {
    font-size: 0.52em;
    line-height: 1;
    vertical-align: top;
    transform: translateX(-0.2em) translateY(0.15em);
  }

  .xl {
    font-size: 36px;
  }
</style>

<script setup>
  const props = defineProps(['size', 'price'])
  const number = (props.price+"").split(".")[0] + '.'
  const decimals = (props.price+"").split(".")[1]
</script>

<template>
  <div v-if="price" :data-price="price" class="price" :class="props.size === 'xl' ? 'xl' : ''">
    <span v-if="number" class="number">{{ number }}</span>
    <span v-if="decimals" class="decimals">{{ decimals }}</span>
  </div>
</template>