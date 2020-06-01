import Vue from 'vue'
import VueRouter from 'vue-router'

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
      path: "/newUser",
      name: "NewUser",
      component: () => import("../views/NewUser.vue"),
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;