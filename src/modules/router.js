import { createRouter,createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'

export const routes = setupLayouts(generatedRoutes)
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

//路由转跳前业务逻辑
router.beforeEach((to, from, next) => { 
  const token = localStorage.getItem('token')
  if(!token && to.name !== 'login'){
    router.replace('/login')
  }else{
    next()
  }
})

//路由转跳结束前业务逻辑
router.afterEach(() => {
  //...
})

export const install = (app) => {
  app.use(router)
}
export default install