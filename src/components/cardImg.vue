<script setup>
defineProps({
  url: null,
});
</script>
<template>
  <b-col v-if="url" md="6" sm="6" cols="12" class="my-2">
    <b-card
      data-aos="zoom-in-up"
      :img-src="url"
      img-alt="Image"
      img-top
      tag="article"
      class="w-100 h-100"
    ></b-card>
  </b-col>
</template>
