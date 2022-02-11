import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
          title: "Login",
        },
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
          title: "Register",
        },
      },
      {
        path: "/page",
        name: "Page",
        component: Page,
        meta: {
          title: "Fil d'actualité",
        },
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;