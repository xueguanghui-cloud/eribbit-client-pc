import { createRouter, createWebHistory } from "vue-router";

const Layout = () => import("@/views/layout.vue");
const Home = () => import("@/views/home/home.vue");
const Category = () => import("@/views/category/category.vue");
const subCategory = () => import("@/views/category/sub.vue");
const Goods = () => import("@/views/goods/goods.vue");
const Login = () => import("@/views/login/login.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由
    {
      path: "/",
      component: Layout,
      children: [
        { path: "/", component: Home },
        { path: "/category/:id", component: Category },
        { path: "/category/sub/:id", component: subCategory },
        { path: "/product/:id", component: Goods },
      ],
    },
    { path: "/login", component: Login },
  ],
  // 路由跳转时，页面回到顶部
  scrollBehavior() {
    // vue2: {x: 0, y: 0}
    // vue3: {top: 0, left: 0}
    return { top: 0 };
  },
});

export default router;
