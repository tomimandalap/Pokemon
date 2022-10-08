import { defineStore } from "pinia";
import axios from "axios";
export const usePokemonStore = defineStore({
  id: "pokemon",
  state: () => ({
    datas: [],
    pokeData: [],
    pagination: {},
    alert_show: false,
    alert_title: "",
    alert_message: "",
  }),
  getters: {
    urlPokemon: (state) => state.datas?.map((item) => item.url),
    cardPokemon: (state) => state.pokeData.map((item) => item.forms[0]),
    previous: (state) =>
      state.pagination.previous
        ? state.pagination.previous.split("?")[1]
        : null,
    next: (state) =>
      state.pagination.next ? state.pagination.next.split("?")[1] : null,
    abilities: (state) => state.pokeData?.[0]?.abilities || [],
    base_experience: (state) => state.pokeData?.[0]?.base_experience,
    forms: (state) => state.pokeData?.[0]?.forms || [],
    game_indices: (state) => state.pokeData?.[0]?.game_indices || [],
    height: (state) => state.pokeData?.[0]?.height,
    weight: (state) => state.pokeData?.[0]?.weight,
    stats: (state) => state.pokeData?.[0]?.stats || [],
    types: (state) => state.pokeData?.[0]?.types || [],
    sprites: (state) => state.pokeData?.[0]?.sprites,
  },
  actions: {
    getList(params) {
      return axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/pokemon`, { params })
        .then((res) => {
          const { previous, next, results } = res.data;
          this.datas = results;
          this.pagination = { previous, next };
          return true;
        })
        .catch((err) => {
          console.error(err.response);
          return false;
        });
    },
    pokeList(id) {
      axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/pokemon${id}`)
        .then((res) => {
          this.pokeData.push({ ...res.data });
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
    pokeForm(id) {
      axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/pokemon-form${id}`)
        .then((res) => {
          console.log("THIS", res.data.sprites);
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
  },
});
