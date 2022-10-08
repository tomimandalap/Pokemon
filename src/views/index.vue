<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "@/stores/pokemon";
import { createToaster } from "@meforma/vue-toaster";

// declarations
const urlImg = import.meta.env.VITE_API_IMG_URL;
const router = useRouter();
const pokemonStore = usePokemonStore();
const params = ref({
  offset: 0,
  limit: 20,
});
const toaster = createToaster({
  position: "bottom",
});

// computed
const datas = computed(() => pokemonStore.datas);
const pokeData = computed(() => pokemonStore.pokeData);
const previous = computed(() => pokemonStore.previous);
const next = computed(() => pokemonStore.next);
const alert_show = computed(() => pokemonStore.alert_show);
const alert_message = computed(() => pokemonStore.alert_message);

// watch
watch(alert_show, (val) => {
  if (val) {
    toaster.error(`${alert_message.value}`);
  }
  pokemonStore.$reset();
});

// metods
const load = async () => {
  window.scrollTo(0, 0);
  pokemonStore.$reset();
  const res = await pokemonStore.getList(params.value);

  if (res) {
    datas.value.forEach((item) => {
      const name = item.name;
      pokemonStore.pokeList(name);
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
    <b-row v-if="pokeData.length">
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
            @click="router.push(`/web/detail/${item.name}`)"
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

    <b-row v-else>
      <b-col
        cols="12"
        class="d-flex flex-column justify-content-center align-items-center min-vh-100"
      >
        <img src="@/assets/img/logo.png" max-width="1000" />
        <h3 class="text-danger my-3">No results found!</h3>
      </b-col>
    </b-row>
  </div>
</template>
