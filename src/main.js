import { createApp } from "vue";
import { createPinia } from "pinia";
import BootstrapVue3 from "bootstrap-vue-3";
import Toaster from "@meforma/vue-toaster";
import AOS from "aos";

import App from "./App.vue";
import router from "./router";
import "./assets/scss/base.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "aos/dist/aos.css";

AOS.init({
  easing: "ease-out-cubic",
  once: true,
  offset: 50,
  delay: 50,
  duration: 500,
});

const app = createApp(App);

app.use(BootstrapVue3);
app.use(Toaster);
app.use(createPinia());
app.use(router);

app.mount("#app");
