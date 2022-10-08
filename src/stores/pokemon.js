import { defineStore } from "pinia";
import axios from "axios";
export const usePokemonStore = defineStore({
  id: "pokemon",
  state: () => ({
    datas: [],
    pokeData: [],
    pagination: {},
    alert_show: false,
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
    abilities: (state) =>
      state.pokeData?.[0]?.abilities?.map((item) => {
        return {
          name: item.ability.name,
          url: item.ability.url,
          slot: item.slot,
        };
      }) || [],
    base_experience: (state) => state.pokeData?.[0]?.base_experience,
    forms: (state) => state.pokeData?.[0]?.forms || [],
    game_indices: (state) =>
      state.pokeData?.[0]?.game_indices?.map((item) => {
        return {
          game_index: item.game_index,
          name: item.version.name,
          url: item.version.url,
        };
      }) || [],
    height: (state) => state.pokeData?.[0]?.height,
    weight: (state) => state.pokeData?.[0]?.weight,
    stats: (state) =>
      state.pokeData?.[0]?.stats?.map((item) => {
        return {
          base_stat: item.base_stat,
          effort: item.effort,
          stat: item.stat.name,
          url: item.stat.url,
        };
      }) || [],
    types: (state) =>
      state.pokeData?.[0]?.types?.map((item) => {
        return {
          slot: item.slot,
          name: item.type.name,
          url: item.type.url,
        };
      }) || [],
    sprites: (state) => state.pokeData?.[0]?.sprites,
    name: (state) => state.pokeData?.[0]?.name,
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
    pokeList(name) {
      return axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/pokemon/${name}`)
        .then((res) => {
          this.pokeData.push({ ...res.data });
          return true;
        })
        .catch((err) => {
          console.error(err.response);

          this.alert_show = true;
          this.alert_message = err.response?.data;
          return false;
        });
    },
  },
});
