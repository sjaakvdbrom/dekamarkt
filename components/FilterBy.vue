<style scoped>
  .active {
    font-weight: bold;
  }

  .tabs {
    margin-bottom: 30px;
  }

  .trigger {
    position: relative;
    padding: 10px 15px;
    border: none;
    background-color: #fff;
    border: 1px solid var(--color-border);
    border-radius: 5px 5px 0 0;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    font-weight: 600;
  }

  .trigger::after {
    content: '';
    position: absolute;
    z-index: 3;
    height: 18px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    transform: translateY(50%);
  }

  .tab {
    position: relative;
    padding: 20px;
    background-color: #fff;
    border: 1px solid var(--color-border);
    border-radius: 0 5px 5px 5px;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.05);
  }

  .title {
    font-size: 18px;
  }

  .filter-list {
    --flex-gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .filter {
    --flex-items: 1;
    width: calc((100% / var(--flex-items)) - (((var(--flex-items) - 1) / var(--flex-items)) * var(--flex-gap)));
  }

  .filter-label:hover {
    display: inline-block;
    text-decoration: underline;
    cursor: pointer;
  }

  .reset {
    margin-top: 15px;
  }

  @media (min-width: 600px) {
    .filter {
        --flex-items: 2;
    }
  }

  @media (min-width: 940px) {
    .filter {
        --flex-items: 3;
    }
  }

  @media (min-width: 1200px) {
    .filter {
        --flex-items: 4;
    }
  }
</style>

<script setup>
  const originalProducts = useOriginalProducts();
  const products = useProducts();
  const brands = useBrands();
  const filtered = ref(false)
  const brandButton = ref(null);

  const filter = (event, brand) => {
    toRaw(brandButton.value).map(item => item.classList.remove('active'))
    // TODO: allow for filtering multiple conditions
    filtered.value = true
    products.value = originalProducts.value.filter((item) => item.Brand === brand);
    event.target.classList.toggle('active')
  }

  const reset = () => {
    brandButton.value.map(item => item.classList.remove('active'))
    filtered.value = false
    products.value = originalProducts.value;
  }
</script>

<template>
  <div class="filters">
      <h2 class="title">Filter op</h2>
      <div class="tabs">
        <template v-if="brands.length">
          <button class="trigger">Merk</button>
            <div class="tab">
              <ul class="filter-list">
                <li v-for="(brand, index) in brands" :key="index" class="filter">
                  <label v-if="brand !== null" @click="event => filter(event, brand)" ref="brandButton" class="filter-label">{{ brand }}</label>
                </li>
              </ul>
              <div v-if="filtered === true" class="reset">
                <Button @click="reset">Reset filters</Button>
              </div>
            </div>
        </template>
      </div>
    </div>
</template>
