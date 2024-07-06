import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import SwapView from "@/components/pages/SwapView.vue";
import LaunchpoolView from "@/components/pages/LaunchpoolView.vue";

const routes = [
    { path: '/', component: SwapView },
    { path: '/launchpools', component: LaunchpoolView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
