<style scoped>
  .button {
    display: inline-block;
    padding: 8px 16px;
    background-color: #87be34;
    border: none;
    color: #fff;
    border-radius: 3px;
    appearance: none;
    cursor: pointer;
  }

  .button:hover {
    background-color: #7baf2e;
  }
</style>

<template>
  <button type="button" class="button">
    <slot></slot>
  </button>
</template>
