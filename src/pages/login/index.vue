<template>
<div id="login">
  <el-header class="header" flex items-center>
    <Head />
  </el-header>
  <el-main class="main">
    <p>基于Vue 3, Vite, pnpm进行项目搭建</p>
    <p>Vite使用 esbuild 进行打包管理</p>
    <p>基于文件的 vite-plugin-pages  vue-router路由管理和 vite-plugin-vue-layouts 布局管理</p>
    <p>使用 unplugin-auto-import 和unplugin-vue-components 进行自动化管理</p>
    <p>使用 unplugin-icons 进行进行图标管理和自动导入. 可以使用iconify里面的任意图标</p>
    <p>使用 axios 进行网络请求</p>
    <p>使用 pinia 进行状态管理</p>
    <p>使用 SCSS 进行样式扩展</p>
    <p>使用 unocss 进行样式管理</p>
    <p>使用 vue-i18n 进行国际化管理</p>
    <p>使用 element-plus 进行UI组件库</p>
    <el-button >{{t('login.Login')}}</el-button>
  </el-main>
  <el-footer>

  </el-footer>
</div>
</template>

<script setup >
const { t } = useI18n()

</script>

<style scoped lang="scss">
.main{
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 45px;
}
</style>

<route lang="yaml">
  meta:
    layout: login
</route>