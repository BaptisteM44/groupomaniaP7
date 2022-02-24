import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Feed from "@/views/Feed.vue";
import Post from "@/views/Post.vue";

const routes = [
    { path: '/', redirect: '/feed' },
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
        path: "/feed",
        name: "Feed",
        component: Feed,
        meta: {
          title: "Fil d'actualité",
        },
      },
      {
        path: "/post",
        name: "Post",
        component: Post,
        meta: {
          title: "Post",
        },
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;