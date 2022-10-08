<script setup>
import { onMounted, computed } from "vue";
import { usePokemonStore } from "@/stores/pokemon";
const pokemonStore = usePokemonStore();
const params = {
  limit: 25,
};

// computed
const urlPokemon = computed(() => pokemonStore.urlPokemon);
const pokeData = computed(() => pokemonStore.pokeData);

// metods
const load = async () => {
  const res = await pokemonStore.getList(params);

  if (res) {
    urlPokemon.value.forEach((url) => {
      pokemonStore.pokeList(url.split("/pokemon")?.[1]);
      // pokemonStore.pokeForm(url.split("/pokemon")?.[1]);
    });
  }
};

// mounted
onMounted(() => load());
</script>
<template>
  <b-container fluid="">
    <b-row class="my-5">
      <b-col v-for="(item, i) in pokeData" :key="i" md="3" sm="6" cols="12">
        <b-card
          :title="item.name"
          :img-src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${item.id}.png`"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 100%"
          class="my-3"
        ></b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
