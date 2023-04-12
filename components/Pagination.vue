<script setup>
  const props = defineProps(['currentPage', 'totalPages', 'currentPage'])
  const emit = defineEmits(['pagechanged'])

  const isInFirstPage = computed(() => {
    return props.currentPage === 1;
  })

  const isInLastPage = computed(() => {
    return props.currentPage === props.totalPages;
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