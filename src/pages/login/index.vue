<template>
<div id="login">
  <el-header class="header" flex items-center>
    <h1 class="title" flex-1 text-18px font-800>
      {{ t('login.Welcome') }}
    </h1>
    <div class="lang" flex flex-1 justify-end>
      <LanguageButton />
    </div>
  </el-header>
  <el-main class="main">
    <div v-loading="state.loadon" class="login_box" :class="{ switching: state.loading }">
      <el-form v-show="state.type == 'change'" ref="ruleFormRef" :model="change" :rules="rules">
        <el-form-item>
          <h2 class="title" text-20px>
            {{ t('login.Change') }}
          </h2>
        </el-form-item>
        <el-form-item prop="newPwd">
          <span>New Password</span>
          <el-input v-model="change.newPwd" ref="resetInput" type="password" show-password clearable :placeholder="t('login.NewPassword')"
          @keyup.enter="onSubmit(ruleFormRef)">
            <template #prefix>
              <el-icon i-carbon:password />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="newsPwd">
          <span>Confirm Password</span>
          <el-input v-model="change.newsPwd" type="password" show-password clearable :placeholder="t('login.confirm')"
          @keyup.enter="onSubmit(ruleFormRef)">
            <template #prefix>
              <el-icon i-carbon:password />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="onSubmit(ruleFormRef)">
            {{ t('login.Submit') }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" link @click="switching('login')">
            {{ t('login.Goback') }}
          </el-button>
        </el-form-item>
      </el-form>

      <el-form v-show="state.type == 'login'" ref="loginRef" :model="state.form" :rules="useRules">
        <el-form-item>
          <h2 class="title-login" text-20px>
            {{ t('login.Account') }}
          </h2>
        </el-form-item>
        <el-form-item prop="ptCode">
          <span>{{ t('login.Credit') }}</span>
          <el-input v-model="state.form.ptCode" ref="refInput" clearable :placeholder="t('login.EnterMember')"
            @blur="state.form.ptCode = ($event.target as any).value.trim().toLocaleUpperCase()" @keyup.enter="onLogin">
            <template #prefix>
              <el-icon i-carbon:user-avatar />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <span>{{ t('login.UserID') }}</span>
          <el-input v-model="state.form.username" clearable :placeholder="t('login.EnterAccount')" @keyup.enter="onLogin">
            <template #prefix>
              <el-icon i-carbon:user-avatar />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span>{{ t('login.Password') }}</span>
          <el-input v-model="state.form.password" type="password" clearable show-password :placeholder="t('login.EnterPassword')" @keyup.enter="onLogin">
            <template #prefix>
              <el-icon i-carbon:password />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px;">
          <div style="text-align: center;width: 100%;">
            <el-button type="primary" class="submit-btn bthColor" plain @click="onLogin">
              {{ t('login.Login') }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="footerTitle footerTitleTwo">
            <p>{{ VITE_version }}</p>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
  <el-footer style="align-items: center;display: flex;">
    <span class="footerTitle">{{ t('login.FontTitle') }}</span>
  </el-footer>
</div>
</template>
<script setup lang="ts">
  import { vBlur } from '@/common/directive';
  import { Userlogin } from '@/apis'
  const router = useRouter()
  const name = ref('Welcome to vue3 telplate')

const { t } = useI18n()
const state = reactive({
  //DialogToU
  DialogToU:false,
  DialogToUID:"",
  // 判断登录还是重置密码状态
  loading: false,
  loadon: false,
  type: 'login', // login or change
  form: { // 登录请求数据
    ptCode: 'FF038',
    username: 'Admin',
    password: '123456',
  },
})
const useRules = reactive<FormRules>({
  ptCode: [
    { required: true, message: 'Please enter participant code', trigger: 'blur' },
  ],
  username: [
    { required: true, message: 'Please enter user ID', trigger: 'blur' },
  ],
  password: [
    { required: true, message: t('drawer.password'), trigger: 'blur' },
    { min: 8, max: 16, message: t('login.MessageTwo'), trigger: 'blur' },
  ],
})
// 修改密码
const change = reactive({
  newPwd: '',
  newsPwd: '',
  oldPwd: state.form.password,
})
watch(() => state.form.password, (newPassword) => {
  change.oldPwd = newPassword
})

// 密码校验
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '')
    callback(new Error(t('login.ErrorOne')))

  else if (value !== change.newPwd)
    callback(new Error(t('login.ErrorTwo')))

  else
    callback()
}
const rules = reactive({
  newPwd: [
    { required: true, message: t('login.MessageOne'), trigger: 'blur' },
    { min: 8, max: 16, message: t('login.NewPassword'), trigger: 'blur' },
  ],
  newsPwd: [{ validator: validatePass2, trigger: 'blur' }],
})

// 点击登录按钮
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  formEl.validate((valid) => {
    if (valid)
      upToPassword()
    else
      return false
  })
}

// 修改密码
const upToPassword = () => {
  state.loadon = true
  upPassword(change,user.Token).then((res:any) => {
    if (res.status == 200) {
      ElMessage({
        grouping: true,
        message: t('login.ElMessOne'),
        type: 'success',
      })
      setTimeout(() => {
        outLogin()
        localStorage.clear()
        sessionStorage.clear()
        location.reload()
      }, 500)
    }
    else {
      ElMessage({
        grouping: true,
        message: `${res.data}`,
        type: 'error',
      })
    }
  }).catch((err) => {
    if (err)
      state.loadon = false
  })
}

// 登录账户
const loginRef = ref<FormInstance>();
const user = reactive({
  Token:{}
})
const userInfo = useUserInfo()
const onLogin = async () => {
  Userlogin().then((data)=>{
    console.log(data)
    sessionStorage.setItem('userToken',data.userToken)
    userInfo.value = data
    router.push('./')
  })
}

// 修改密码，返回
const resetInput =ref()
const switching = (type: string) => {
  state.loading = true
  setTimeout(() => {
    state.loading = false
  }, 800)
  setTimeout(() => {
    state.type = type
    resetInput.value.focus();
  }, 400)
}

// 判断加载
const useInfoMenu: any = useGlobalMenu()
const token = localStorage.getItem('userToken')
const useInfos = localStorage.getItem('userInformation')
const Need = localStorage.getItem('NeedResetPassword')
if (token && useInfos && useInfoMenu.value.length > 0 && useInfo.value.role && !Need ) {
  state.loadon = true
  router.replace('/')
}

// 初始化、
const refInput = ref();


// DialogToU
const clsoeToU = ()=>{
  state.DialogToU = false
  state.DialogToUID = usetextTermsOfUse.value
  location.reload()
}
const saveData=()=>{
  localStorage.setItem('textTermsOfUse-storage',state.DialogToUID)
  localStorage.setItem('userToken', JSON.stringify(user.Token))
  localStorage.setItem('userInformation', JSON.stringify({
    ptCode: state.form.ptCode,
    username: state.form.username,
  }))
}
  //登录
  const loginForm = reactive({
    username:"Admin",
    password:"12345678"
  })
  const username = ref('Admin')
  const password = ref('12345678')
  const login=()=>{
    Userlogin(loginForm).then((data)=>{
      const userInfo = useUserInfo()
      sessionStorage.setItem('userToken',data.userToken)
      userInfo.value = data
      router.push('/')
    })
  }
</script>
<style scoped lang="scss">
#login{
  height: 100%;
  display: flex;
  flex-direction: column;
  .main{
    background-image:url("/src/assets/images/background.jpg");
    background-size: cover;
    position: relative;
    .login_box{
      box-sizing: border-box;
      width: 490px;
      position: absolute;
      top: 45%;
      right: 110px;
      margin-top: -200px;
      border: 1px solid #ccc;
      padding: 50px 50px 20px;
      background: #fff;
      border-bottom: 9px solid #0168da;
    }
    .title-login {
      color: #3084D7;
      font-size: 30px;
      font-family: DM Sans;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .submit-btn{
      font-size: 20px;
      width: 201px;
      height: 47px;
      flex-shrink: 0;
      --el-button-bg-color: #fff !important;
    }
  }
}
@keyframes flip {
  0% {
    transform: perspective(2000px) rotateY(0)
  }
  100% {
    transform: perspective(2000px) rotateY(90deg)
  }
}
@keyframes flip_out {
  0% {
    transform: perspective(2000px) rotateY(-90deg)
  }
  100% {
    transform: perspective(2000px) rotateY(0)
  }
}
.switching {
  -webkit-transform: perspective(2000px) rotateY(-90deg);
  -webkit-animation: flip .4s linear,flip_out .4s .41s linear;
  transform: perspective(2000px) rotateY(-90deg);
  animation: flip .4s linear,flip_out .4s .41s linear
}
.footerTitle{
  line-height: 12px;
  display: inline-block;
  font-size: 12px;
  .link{
    cursor: pointer;
    color: #2d5afd;
  }
  width: 100%;
  color: #000;
  font-family: DM Sans;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.footerTitleOne{
  line-height: 12px;
  display: inline-block;
  font-size: 12px;
  text-align: left;
  .link{
    cursor: pointer;
    color: #2d5afd;
  }
  width: 100%;
  color: #000;
  font-family: DM Sans;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.footerTitleTwo{
  line-height: 12px;
  display: inline-block;
  font-size: 12px;
  transform: scale(0.92);
  text-align: left;
  width: 100%;
  color: #000;
  font-family: DM Sans;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
}
</style>

<route lang="yaml">
  meta:
    layout: login
</route>