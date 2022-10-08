<script setup>
import { ref, computed } from "vue";
import { usePokemonStore } from "@/stores/pokemon";

// props
defineProps({
  show: { type: Boolean, default: false },
});

// declarations
const search = ref("");
const pokemonStore = usePokemonStore();
const params = ref({
  offset: 0,
  limit: 20,
});

// computed
const datas = computed(() => pokemonStore.datas);

// methods
const load = async () => {
  const res = await pokemonStore.getList(params.value);

  if (res) {
    datas.value.forEach((item) => {
      const name = item.name;
      pokemonStore.pokeList(name);
    });
  }
};

const handleSearch = async () => {
  const isEmpty = search.value;
  pokemonStore.$reset();
  if (isEmpty) await pokemonStore.pokeList(search.value);
  else load();
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
