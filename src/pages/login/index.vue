<template>
<div id="login">
  <el-header class="header" flex items-center>
    <Head />
  </el-header>
  <el-main class="main">
    <p>Welcome to the vue-template</p>
    <el-button @click="toLogin">{{t('login.Login')}}</el-button>
  </el-main>
  <el-footer>

  </el-footer>
</div>
</template>

<script setup >
import { Userlogin } from '@/apis/user'
const { t } = useI18n()

const toLogin = async () => {
  const res = await Userlogin({
    username: 'admin',
    password: '123456',
  })
  console.log(res)
}
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