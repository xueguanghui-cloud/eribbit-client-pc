import { createRouter, createWebHistory } from "vue-router";

const Layout = () => import("@/views/layout.vue");
const Home = () => import("@/views/home/home.vue");
const Category = () => import("@/views/category/category.vue");
const subCategory = () => import("@/views/category/sub.vue");

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
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
