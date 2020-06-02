import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "../views/Home";
import Information from "../views/Information";
import Settings from "../views/Settings";

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "Index",
      component: () => import("../views/Index.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue")
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/Signup.vue"),
    },
    {
      path: "/newuser",
      name: "NewUser",
      component: () => import("../views/NewUser.vue"),
    },
    {
      path: "/main",
      name: "Main",
      component: () => import("../views/Main.vue"),
      children: [
        {
          path: "home",
          component: Home
        },
        {
          path: "information",
          component: Information
        },
        {
          path: "settings",
          component: Settings
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;