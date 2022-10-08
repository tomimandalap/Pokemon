<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "@/stores/pokemon";

// declarations
const urlImg = import.meta.env.VITE_API_IMG_URL;
const router = useRouter();
const pokemonStore = usePokemonStore();
const params = ref({
  offset: 0,
  limit: 20,
});

// computed
const urlPokemon = computed(() => pokemonStore.urlPokemon);
const pokeData = computed(() => pokemonStore.pokeData);
const previous = computed(() => pokemonStore.previous);
const next = computed(() => pokemonStore.next);

// metods
const load = async () => {
  const res = await pokemonStore.getList(params.value);

  if (res) {
    urlPokemon.value.forEach((url) => {
      const id = url.split("/pokemon")?.[1];
      pokemonStore.pokeList(id);
      // pokemonStore.pokeForm(url.split("/pokemon")?.[1]);
    });
  }
};

const handlePrevious = async (payload) => {
  const splitLimit = payload.split("&limit=");
  const splitOffset = splitLimit[0].split("offset=");
  params.value.offset = Number(splitOffset[1]);
  params.value.limit = Number(splitLimit[1]);
  pokemonStore.$reset();
  load();
};

const handleNext = async (payload) => {
  const splitLimit = payload.split("&limit=");
  const splitOffset = splitLimit[0].split("offset=");
  params.value.offset = Number(splitOffset[1]);
  params.value.limit = Number(splitLimit[1]);
  pokemonStore.$reset();
  load();
};

// mounted
onMounted(() => load());
</script>
<template>
  <div class="home container-fluid">
    <b-row>
      <b-col v-for="(item, i) in pokeData" :key="i" md="3" sm="6" cols="12">
        <b-card
          data-aos="zoom-in-up"
          :title="item.name"
          :img-src="`${urlImg}/${item.id}.png`"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 100%"
          class="my-3"
        >
          <b-button
            variant="outline-danger"
            class="w-100"
            @click="router.push(`/web/detail/${item.id}`)"
          >
            Detail
          </b-button>
        </b-card>
      </b-col>

      <b-col cols="12" class="text-center">
        <b-button
          data-aos="zoom-in-up"
          :disabled="!previous"
          :variant="previous ? 'primary' : 'secondary'"
          class="me-1"
          @click="handlePrevious(previous)"
        >
          Previous
        </b-button>
        <b-button
          data-aos="zoom-in-up"
          :disabled="!next"
          :variant="next ? 'primary' : 'secondary'"
          @click="handleNext(next)"
        >
          Next
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>
