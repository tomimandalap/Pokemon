<script setup>
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonStore } from "@/stores/pokemon";
import Cardimg from "@/components/cardImg.vue";

// declarations
const route = useRoute();
const router = useRouter();
const pokemonStore = usePokemonStore();
const urlImg = import.meta.env.VITE_API_IMG_URL;

// computed
const pokeData = computed(() => pokemonStore.pokeData);
const abilities = computed(() => pokemonStore.abilities);
const base_experience = computed(() => pokemonStore.base_experience);
const forms = computed(() => pokemonStore.forms);
const game_indices = computed(() => pokemonStore.game_indices);
const height = computed(() => pokemonStore.height);
const weight = computed(() => pokemonStore.weight);
const stats = computed(() => pokemonStore.stats);
const types = computed(() => pokemonStore.types);
const sprites = computed(() => pokemonStore.sprites);

// methods
const load = () => {
  const { params } = route;
  const id = Number(params?.id);
  pokemonStore.$reset();
  pokemonStore.pokeList(`/${id}`);
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

      <b-col v-for="(item, i) in pokeData" :key="i" md="4" class="my-2">
        <b-card
          data-aos="zoom-in-up"
          :img-src="`${urlImg}/${item.id}.png`"
          :title="item.name"
          img-alt="Image"
          img-top
          tag="article"
          class="w-100 h-100"
        >
          <h5 class="text-danger">Weight: {{ weight }}</h5>
          <h5 class="text-danger">Base Experience: {{ base_experience }}</h5>
          <h5 class="text-danger">Sprites</h5>
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
      <b-col md="8" class="my-2">
        <b-card data-aos="zoom-in-up" class="w-100 h-100">
          <h6 v-if="abilities.length">Abilities</h6>
          <ul v-if="abilities.length">
            <li v-for="(list, i) in abilities" :key="i">
              <p>{{ list.ability.name }}</p>
            </li>
          </ul>

          <h6 v-if="forms.length">Forms</h6>
          <ul v-if="forms.length">
            <li v-for="(list, j) in forms" :key="j">
              <p>{{ list.name }}</p>
            </li>
          </ul>

          <h6 v-if="game_indices.length">Game Indices</h6>
          <ul v-if="game_indices.length">
            <li v-for="(list, k) in game_indices" :key="k">
              <p>
                Game index: {{ list.game_index }} | Version:
                {{ list.version.name }}
              </p>
            </li>
          </ul>

          <h6 v-if="stats.length">Stats</h6>
          <ul v-if="stats.length">
            <li v-for="(list, l) in stats" :key="l">
              <p>
                Base stat: {{ list.base_stat }} | Effort: {{ list.effort }} |
                Stat:
                {{ list.stat.name }}
              </p>
            </li>
          </ul>

          <h6 v-if="types.length">Types</h6>
          <ul v-if="types.length">
            <li v-for="(list, m) in types" :key="m">
              <p>Slot: {{ list.slot }} | Type: {{ list.type.name }}</p>
            </li>
          </ul>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
