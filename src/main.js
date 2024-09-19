import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import SwapView from "@/components/pages/SwapView.vue";
import { createPinia } from "pinia";

const routes = [
    { path: '/', component: SwapView },
    { path: '/token/mint', component: () => import('@/components/pages/TokenMinterView.vue') },
    { path: '/token/launchpad', component: () => import('@/components/pages/LaunchpadView.vue') },
    { path: '/profile', component: () => import('@/components/pages/ProfilView.vue') },
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