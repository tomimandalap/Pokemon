import { createRouter, createWebHistory } from "vue-router";
import LayoutDefault from "../layouts/default.vue";
import LayoutLanding from "../layouts/landing.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/web",
      component: LayoutLanding,
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("../views/index.vue"),
        },
      ],
    },
    {
      path: "/",
      component: LayoutDefault,
      children: [
        {
          path: "",
          beforeEnter: (to, from, next) => {
            next("/web");
          },
        },
        {
          path: "404",
          name: "404",
          component: () => import("../views/404.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      beforeEnter: (to, from, next) => {
        next("/404");
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
  // const { auth } = to.meta
  // const isWeb = to.path.includes('web')
  // const isToken = localStorage.getItem('access_token')

  // if (auth) {
  //   if (isToken) next()
  //   else next({ path: '/login' })
  // } else if (!auth) {
  //   if (isToken && !isWeb) next({ path: '/web' })
  //   else next()
  // } else {
  //   next()
  // }
});

router.afterEach((to) => {
  document.title = `Pokemon | ${to.name || "Pokemon"}`;
});

export default router;
