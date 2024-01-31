<template>
  <h1>{{ name }}</h1>
  <div class="card">
    <img src="../assets/vue.svg" alt="vue">
    <img src="/vite.svg" alt="vite">
  </div>
  <h1>{{ t('login.Welcome') }}</h1>
  <button type="button" @click="goJSON">GO to JSON</button>
</template>
<script setup lang="ts">
  import { baiduHomepage } from '@/apis'
  const { t } = useI18n()
  const router = useRouter()
  const name = ref('template-vue3-test')
  baiduHomepage().then((data) => {
    name.value = data.name
  }).catch((err)=>{
    console.log(err)
  })
  const goJSON=()=>{
    router.push('/json')
  }
</script>
<style scoped lang="scss">
.card{
  font-size: 16px;
  background-color: $bgColor;
  @include flex(space-evenly,null,wrap);
  button{
    font-size: 18px;
  }
}
</style>
