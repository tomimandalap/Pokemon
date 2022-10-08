<script setup>
import { ref, computed, watch } from "vue";
import { usePokemonStore } from "@/stores/pokemon";
import { createToaster } from "@meforma/vue-toaster";

// props
defineProps({
  show: { type: Boolean, default: false },
});

// declarations
const search = ref("");
const pokemonStore = usePokemonStore();
const toaster = createToaster({
  position: "bottom",
});

const params = ref({
  offset: 0,
  limit: 20,
});

// computed
const datas = computed(() => pokemonStore.datas);
const alert_show = computed(() => pokemonStore.alert_show);
const alert_message = computed(() => pokemonStore.alert_message);

// watch
watch(alert_show, (val) => {
  if (val) {
    toaster.error(`${alert_message.value}`);
  }
  pokemonStore.$reset();
});

watch(search, (val) => {
  const isEmpty = !val;
  if (isEmpty) load();
});

// methods
const load = async () => {
  pokemonStore.$reset();
  const res = await pokemonStore.getList(params.value);
  if (res) {
    datas.value.forEach((item) => {
      const name = item.name;
      pokemonStore.pokeList(name);
    });
  }
};

const handleSearch = async () => {
  const isEmpty = !search.value;
  if (!isEmpty) {
    pokemonStore.$reset();
    await pokemonStore.pokeList(search.value);
  }
};
</script>
<template>
  <b-navbar toggleable="sm" type="dark" variant="danger" fixed="top">
    <b-navbar-brand href="#">
      <img src="@/assets/img/logo.png" width="120" />
    </b-navbar-brand>

    <b-navbar-toggle v-if="!show" target="nav-collapse"></b-navbar-toggle>

    <b-collapse v-if="!show" id="nav-collapse" is-nav>
      <b-navbar-nav class="ms-auto">
        <b-form-input
          v-model="search"
          placeholder="Search by name"
          class="my-2"
          @keyup.enter="handleSearch"
        ></b-form-input>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
