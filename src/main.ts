import { createApp } from 'vue'
import '@/assets/styles/index.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/modules/router'
import pinia from '@/modules/pinia'
import i18 from '@/modules/i18n'
import imgzoom from 'imgzoom-li'
imgzoom.init()

createApp(App)
.use(i18)
.use(router)
.use(pinia)
.mount('#app')
