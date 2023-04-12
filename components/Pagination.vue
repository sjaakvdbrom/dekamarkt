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
  <ul>
    <li>
      <button
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        First
      </button>
    </li>

    <li>
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        Previous
      </button>
    </li>

    <!-- Visible Buttons Start -->
    <li
      v-for="page in pages"
      :key="page.name"
    >
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
      >
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li>
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        Next
      </button>
    </li>

    <li>
      <button
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        Last
      </button>
    </li>
  </ul>
</template>