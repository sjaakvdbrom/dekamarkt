<style scoped>
  .button {
    display: inline-block;
    padding: 8px 16px;
    background-color: #87be34;
    font-size: 15px;
    border: none;
    color: #fff;
    border-radius: 3px;
    appearance: none;
    cursor: pointer;
  }

  .button.xxl {
    font-size: 19px;
    padding: 15px 25px;
    border-radius: 5px;
  }

  .full {
    width: 100%;
  }

  .button:hover {
    background-color: #7baf2e;
  }
</style>

<script setup>
  const props = defineProps(['size'])
</script>

<template>
  <button type="button" class="button" :class="size ? size : ''">
    <slot></slot>
  </button>
</template>
