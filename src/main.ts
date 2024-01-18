import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter,createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
.use(router)
.mount('#app')
