<template>
  <div id="login" class="login-container">
    <el-header class="header" flex items-center>
      <Head />
    </el-header>
    <el-main class="main">
      <div class="login-form">
        <h2>Welcome to the vue-template</h2>
        <el-form :model="loginForm" ref="loginFormRef" label-position="top">
          <el-form-item label="Email">
            <el-input v-model="loginForm.Email" placeholder="Enter your Email" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              v-model="loginForm.Password"
              type="password"
              placeholder="Enter your Password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toLogin">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer class="footer">
      <p>&copy; 2025 vue-template. All rights reserved.</p>
    </el-footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Userlogin,UserInfo } from '@/apis/user';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const router = useRouter();
const loginForm = ref({
  Email: 'xianbin@qq.com',
  Password: '123456',
});

const toLogin = async () => {
  const res = await Userlogin({
    Email: loginForm.value.Email,
    Password: loginForm.value.Password,
  });
  if(res.status == 200){
    localStorage.setItem('token', res.token);
    const userInfo = await UserInfo();
    console.log(userInfo);
    router.push('/');
  }
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #fff;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login-form {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 360px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-button {
    width: 100%;
  }
}

.footer {
  background-color: #fff;
  padding: 10px 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<route lang="yaml">
  meta:
    layout: login
</route>