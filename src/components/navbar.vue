<script setup>
defineProps({
  show: { type: Boolean, default: false },
});
</script>
<template>
  <b-navbar toggleable="sm" type="dark" variant="danger" fixed="top">
    <b-navbar-brand href="#">
      <img src="@/assets/img/logo.png" width="120" />
    </b-navbar-brand>

    <b-navbar-toggle v-if="!show" target="nav-collapse"></b-navbar-toggle>

    <b-collapse v-if="!show" id="nav-collapse" is-nav>
      <b-navbar-nav class="ms-auto">
        <b-form-input placeholder="Cari" class="my-2"></b-form-input>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
