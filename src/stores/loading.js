import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    overlay: false,
  }),
  getters: {},
  actions: {
    setOverlay(payload) {
      this.overlay = payload;
    },
  },
});
