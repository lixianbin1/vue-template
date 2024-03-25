<template>
  <RouterView />
</template>

<script setup lang="ts">
  //import {useRoute,useRouter} from 'vue-router'
  const route = useRoute()
  const router = useRouter()

  //路由转跳前业务逻辑
  router.beforeEach((to, from, next) => {
    //判断是否登录
    const token = sessionStorage.getItem('userToken')
    const toPath = to.path.split('/')[1]
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
</script>

<style scoped>
</style>
