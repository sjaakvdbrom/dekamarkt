<style scoped>
  .offcanvas {
    position: fixed;
    z-index: 40;
    top: 0;
    right: 0;
    bottom: 0;
    width: calc(100vw - 90px);
    padding: 15px;
    background-color: #fff;
    border-left: 1px solid var(--color-border);
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
  }

  .backdrop {
    position: fixed;
    z-index: 35;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
    animation: fadeIn 5s;
  }

  .backdrop-visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s linear;
  }
  .backdrop-hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.2s, opacity 0.2s linear;
  }

  .offcanvas-visible {
    visibility: visible;
    transform: translateX(0);
    transition: transform 0.15s ease-out;
  }
  .offcanvas-hidden {
    visibility: hidden;
    transform: translateX(100%);
    transition: visibility 0s 0.15s linear, transform 0.15s ease-in;
  }

  @media (min-width: 940px) {
    .offcanvas {
      width: 30vw;
      min-width: 400px;
      max-width: 650px;
      padding: 40px;
    }
  }
</style>

<script setup>
  const cartOffCanvas = useCartOffcanvas();
</script>

<template>
  <Teleport to="body">
    <div class="backdrop" @click="cartOffCanvas = false" :class="cartOffCanvas === true ? 'backdrop-visible' : 'backdrop-hidden'"></div>
    <div class="offcanvas" :class="cartOffCanvas === true ? 'offcanvas-visible' : 'offcanvas-hidden'">
      <slot></slot>
    </div>
  </Teleport>
</template>