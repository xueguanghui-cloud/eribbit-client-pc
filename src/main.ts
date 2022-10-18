import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/style/main.css";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 导入自己的ui组件库
import UI from "@/baseUI"

// 重置样式库
import "normalize.css"
import "@/assets/style/common.scss"

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(UI);
app.mount("#app");
