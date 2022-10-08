<script setup>
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonStore } from "@/stores/pokemon";

// components
import Cardimg from "@/components/cardImg.vue";
import Customtable from "@/components/customTable.vue";

// declarations
const route = useRoute();
const router = useRouter();
const pokemonStore = usePokemonStore();

// computed
const pokeData = computed(() => pokemonStore.pokeData);
const abilities = computed(() => pokemonStore.abilities);
const base_experience = computed(() => pokemonStore.base_experience);
const forms = computed(() => pokemonStore.forms);
const game_indices = computed(() => pokemonStore.game_indices);
const name = computed(() => pokemonStore.name);
const height = computed(() => pokemonStore.height);
const weight = computed(() => pokemonStore.weight);
const stats = computed(() => pokemonStore.stats);
const types = computed(() => pokemonStore.types);
const sprites = computed(() => pokemonStore.sprites);

// methods
const load = () => {
  const { params } = route;
  const name = params.name;
  pokemonStore.$reset();
  pokemonStore.pokeList(name);
};

// mounted
onMounted(() => load());
</script>
<template>
  <div class="detail container-fluid">
    <b-row v-if="pokeData.length">
      <b-col cols="12" class="my-2">
        <b-button variant="outline-secondary" @click="router.go(-1)">
          Back
        </b-button>
      </b-col>

      <b-col md="4" sm="12" cols="12" class="my-2">
        <b-card data-aos="zoom-in-up" :title="name" class="w-100 h-100">
          <h5 class="text-danger">Height: {{ height }}</h5>
          <h5 class="text-danger">Weight: {{ weight }}</h5>
          <h5 class="text-danger">Base Experience: {{ base_experience }}</h5>
          <h5 class="text-dark">Sprites</h5>
          <b-row>
            <Cardimg :url="sprites.front_default" />
            <Cardimg :url="sprites.back_default" />
            <Cardimg :url="sprites.front_female" />
            <Cardimg :url="sprites.back_female" />
            <Cardimg :url="sprites.front_shiny" />
            <Cardimg :url="sprites.back_shiny" />
            <Cardimg :url="sprites.back_shiny_female" />
            <Cardimg :url="sprites.front_shiny_female" />
          </b-row>
        </b-card>
      </b-col>

      <b-col md="8" sm="12" cols="12" class="my-2">
        <b-card data-aos="zoom-in-up" class="w-100 h-100">
          <Customtable
            v-if="abilities.length"
            title="Abilities"
            :items="abilities"
          />
          <Customtable v-if="forms.length" title="Forms" :items="forms" />
          <Customtable
            v-if="game_indices.length"
            title="Game Indices"
            :items="game_indices"
          />
          <Customtable v-if="stats.length" title="Stats" :items="stats" />
          <Customtable v-if="types.length" title="Types" :items="types" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
