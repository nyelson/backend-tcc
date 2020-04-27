import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/signed-out/Index"),
    children: [
      { path: "/", name: "about", component: () => import("@/views/About") },
      {
        path: "signup",
        name: "Register",
        component: () => import("@/views/signed-out/Signup"),
      },
      {
        path: "signin",
        name: "Entrar",
        component: () => import("@/views/signed-out/Signin"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("@/views/signed-in/Index"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "DashBoard",
        path: "dashboard",
        component: () => import("@/views/signed-in/dashboard/DashBoard"),
      },
      {
        path: "tracker",
        name: "Lista de Bugs",
        component: () => import("@/views/signed-in/tracker/BugList"),
      },
    ],
  },

  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some((route) => route.meta.requiresAuth && !loggedIn)) {
    next({ path: "/signin" });
    return;
  }

  next();
});

export default router;
