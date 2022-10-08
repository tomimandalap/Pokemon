import { defineStore } from "pinia";
import axios from "axios";
export const usePokemonStore = defineStore({
  id: "pokemon",
  state: () => ({
    datas: [],
    pokeData: [],
    alert_show: false,
    alert_title: "",
    alert_message: "",
  }),
  getters: {
    urlPokemon: (state) => state.datas?.map((item) => item.url),
    cardPokemon: (state) => state.pokeData.map((item) => item.forms[0]),
  },
  actions: {
    getList(params) {
      return axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/pokemon`, { params })
        .then((res) => {
          const results = res.data.results;
          this.datas = results;
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
