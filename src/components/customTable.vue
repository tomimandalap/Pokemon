<script setup>
defineProps({
  items: {
    type: Array,
    default: () => {
      [];
    },
  },
  title: { type: String, default: "" },
  variant: { type: String, default: "" },
  dark: { type: Boolean, default: false },
});
</script>
<template>
  <h5 class="text-dark">{{ title }}</h5>
  <b-table
    hover
    bordered
    sticky-header
    responsive="sm"
    head-variant="light"
    :dark="dark"
    :table-variant="variant"
    :items="items"
  ></b-table>
</template>
