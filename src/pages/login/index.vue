<template>
<div id="login">
  <el-card style="width: 400px;margin:0 auto;">
    <h1 style="font-size: 26px;margin-bottom: 40px;">{{ name }}</h1>
    <el-form :model="loginForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="User name">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Pass word">
        <el-input type="password" v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="Pass word">
        <el-button v-blur @click="login">login</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>
<script setup lang="ts">
  import { vBlur } from '@/common/directive';
  const router = useRouter()
  const name = ref('Welcome to vue3 telplate')

  //登录
  const loginForm = reactive({
    username:"Admin",
    password:"12345678"
  })
  const username = ref('Admin')
  const password = ref('12345678')
  const login=()=>{
    localStorage.setItem('userToken','token')
    router.push('/')
  }
</script>
<style scoped lang="scss">
#login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
