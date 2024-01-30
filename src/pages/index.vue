<template>
  <h1>{{ name }}</h1>
  <h1>{{ t('login.Welcome') }}</h1>
  <h1>{{ count }}</h1>

  <div class="card flex f-12px">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <div class="card">
    <button type="button" @click="goJSON">GOJSON</button>
    <p>{{ aa.num }}</p>
    <button type="button" @click="setName">count is {{ Name }}</button>
  </div>
  <div class="card">
    <p>{{ aa.num }} {{ bb.name }}</p>
    <button type="button" @click="aa.add">count is {{ Name }}</button>
  </div>

</template>
<script setup lang="ts">
import { baiduHomepage } from '@/apis'
import axios from 'axios'
const { t } = useI18n()
const router = useRouter()
const aa = useGlobalState()
console.log(aa.num)
aa.add()

const bb = useLocaleUser()
console.log(bb.value.name)

bb.value.name = '35421'

const cc = useLocaleUser()
console.log(cc.value)

const store = userStore()
const Name = computed(()=>store.Name)
console.log(store.Name)

const count = ref(0)
const name = ref('template-vue3-test')

const { state, isReady, isLoading } = useAsyncState(
  axios.get('https://jsonplaceholder.typicode.com/todos/1').then(t => t.data),
  { id: null },
)
console.log(state, isReady, isLoading)

baiduHomepage().then((data) => {
  name.value = data.name
}).catch((err)=>{
  console.log(err)
})

const setName = ()=>{
  store.setName('New Book')
}

const goJSON=()=>{
  router.push('/json')
}

</script>
<style scoped lang="scss">
.card{
  font-size: 16px;
  background-color: $bgColor;
  @include flex(center,null,wrap);
  button{
    font-size: 18px;
  }
}
</style>
