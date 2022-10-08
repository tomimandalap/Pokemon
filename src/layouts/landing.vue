<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";

// components
import Navbar from "@/components/navbar.vue";

// declarations
const route = useRoute();
const show = ref(false);

// updated
onUpdated(() => {
  const { path } = route;
  show.value = path.includes("/detail");
});

// mounted
onMounted(() => {
  const { path } = route;
  show.value = path.includes("/detail");
});
</script>
<template>
  <div class="layout-landing">
    <Navbar :show="show" />
    <div class="layout-default-content">
      <RouterView />
    </div>
  </div>
</template>
