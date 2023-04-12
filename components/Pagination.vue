<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;
  }

  .pages {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid var(--color-border);
    border-radius: 3px;
  }

  .button {
    padding: 5px 10px;
    background-color: transparent;
    border: 1px solid var(--color-border);
    border-radius: 3px;
  }

  .button:not([disabled]):hover {
    background-color: #dedede;
    cursor: pointer;
  }

  .page-button {
    border: none;
    border-radius: 0;
  }

  .page-button.active {
    background-color: var(--color-border);
  }

  .page-item:not(:last-child) {
    border-right: 1px solid var(--color-border);
  }
</style>

<script setup>
  const props = defineProps(['currentPage', 'totalPages', 'currentPage'])
  const emit = defineEmits(['pagechanged'])
  const maxVisibleButtons = ref(3)

  const isInFirstPage = computed(() => {
    return props.currentPage === 1;
  })

  const isInLastPage = computed(() => {
    return props.currentPage === props.totalPages;
  })

  const isPageActive = (page) => {
    return props.currentPage === page;
  }

  const startPage = computed(() => {
    if (props.currentPage === 1) {
      return 1;
    }

    // When on the last page
    if (props.currentPage === props.totalPages) {
      const start = props.totalPages - (maxVisibleButtons.value - 1);

      if (start === 0) {
        return 1;
      } else {
        return start;
      }
    }

    // When inbetween
    return props.currentPage - 1;
  })

  const pages = computed(() => {
    const range = [];

    for (
      let i = startPage.value;
      i <= Math.min(startPage.value + maxVisibleButtons.value - 1, props.totalPages);
      i++
    ) {
      range.push({
        name: i,
        isDisabled: i === props.currentPage
      });
    }

    return range;
  })

  const onClickFirstPage = () => {
    emit('pagechanged', 1);
  }

  const onClickPreviousPage = () => {
    emit('pagechanged', props.currentPage - 1);
  }

  const onClickPage = (page) => {
    emit('pagechanged', page);
  }

  const onClickNextPage = () => {
    emit('pagechanged', props.currentPage + 1);
  }

  const onClickLastPage = () => {
    emit('pagechanged', props.totalPages);
  }
</script>

<template>
  <div class="pagination">
    <button
      type="button"
      @click="onClickPreviousPage"
      :disabled="isInFirstPage"
      class="button"
    >
      Vorige
    </button>

    <!-- Visible Buttons Start -->
    <ul class="pages">
      <li
        v-for="page in pages"
        :key="page.name"
        class="page-item"
      >
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          class="page-button button"
          :class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>
    </ul>

    <!-- Visible Buttons End -->

    <button
      type="button"
      @click="onClickNextPage"
      :disabled="isInLastPage"
      class="button"
    >
      Volgende
    </button>
  </div>
</template>