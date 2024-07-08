import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import SwapView from "@/components/pages/SwapView.vue";
import LaunchpoolView from "@/components/pages/LaunchpoolView.vue";
import ProfilView from "@/components/pages/ProfilView.vue";
import { createPinia } from "pinia";

const routes = [
    { path: '/', component: SwapView },
    { path: '/launchpools', component: LaunchpoolView },
    { path: '/profile', component: ProfilView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const pinia = createPinia();

const app = createApp(App)

app.use(pinia);
app.use(router);
app.mount('#app');