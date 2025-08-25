<template>
  <el-aside v-show="isShow.show" width="auto" style="background-color: #00578E">
    <el-scrollbar height="100%">
      <div class="v-menu i-carbon:menu" @click="isCollapse = !isCollapse" />
      <el-menu
        router
        :unique-opened="true"
        :collapse-transition="false"
        class="el-menu-vertical"
        active-text-color="#F6F6F6"
        background-color="#00578E"
        :collapse="isCollapse"
        :default-active="state.path"
        text-color="#fff"
      >
        <template v-for="item in menuList.list ">
          <MenuItem :data="item" />
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { DynamicMenu } from '@/apis/user';
const isCollapse = ref(true) // 控制menu的展开和收缩
// 用户信息显示
const isShow = reactive({
  show: false,
})
// 设置当前菜单的默认选中
const route = useRoute()
const state = reactive({
  path: `${route.fullPath}`,
})
const onCurrents = () => {

}
// 监听当前路由变化
const router = useRouter()
watch(() => router.currentRoute.value, (e) => {
  state.path = `${e.fullPath}`
})
watch(() => router.currentRoute.value,
  async (newDate) => {
    isLogin()
    if(!isCollapse && roleShow.value==2 && newDate.name == 'HKICLAdminPortal-TermsOfUseManagement'){
      onCurrents()
    }
  },
)
// MenuList菜单数据
const menuList = reactive({
  list: [],
})

// 判断是否登录
const getMenu = async() => {
  const data = await DynamicMenu()
  console.log(data)
  menuList.list = data
}

onBeforeMount(() => {
  getMenu()
})

</script>

<style scoped lang="scss">
.el-menu {
  border-right: 0 !important;
}
.footerTitle{
  font-size: 14px;
  color:#fff;
  display: flex;
  justify-content: center;
  padding: 0 15px;
}
.link{
  cursor: pointer;
  flex: 1;
  text-align: center;
  white-space: nowrap;
}
.el-aside .v-menu{
  color: #fff;
  font-size: 24px;
  width: var(--el-menu-icon-width);
  height: 56px;
  margin-left: 20px;
  cursor: pointer;
}
</style>