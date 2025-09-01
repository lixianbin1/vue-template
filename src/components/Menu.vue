<template>
  <el-aside class="menu" width="auto">
    <el-scrollbar height="100%">
      <div class="v-menu i-carbon:menu" @click="isCollapse = !isCollapse" />
      <el-menu
        router
        :unique-opened="true"
        class="el-menu-vertical"
        :collapse="isCollapse"
        :default-active="state.path"
      >
        <template v-for="item in menuList" :key="item.index">
          <MenuItem :data="item"/>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { DynamicMenu } from '@/apis/menu';
import {useLocaleMenus} from '@/stores/GlobalState'
const isCollapse = ref(false) // 控制menu的展开和收缩

// 设置当前菜单的默认选中
const route = useRoute()
const state = reactive({
  path: `${route.fullPath}`,
})

// 监听当前路由变化
const router = useRouter()
watch(() => router.currentRoute.value, (e) => {
  state.path = `${e.fullPath}`
})

// MenuList菜单数据
const menuList = useLocaleMenus()

// 判断是否登录
const getMenu = async() => {
  const res = await DynamicMenu()
  menuList.value = res.data
  console.log(menuList.value)
}

onBeforeMount(() => {
  getMenu()
})
const itemfor = (item) => { 

}
</script>

<style scoped lang="scss">
.menu{
  border-right: 1px solid rgb(220 223 230);
}
</style>