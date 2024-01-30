import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter,createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import pinia from '@/modules/pinia'
import i18 from '@/modules/i18n'
import generatedRoutes from '~pages'
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
.use(i18)
.use(router)
.use(pinia)
.mount('#app')
