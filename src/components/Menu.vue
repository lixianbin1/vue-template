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
const menuList = ref([])

// 判断是否登录
const getMenu = async() => {
  const res = await DynamicMenu()
  console.log(res)
  const data = cMenuData(res.data)
  menuList.value = data
}
// 处理数据
function cMenuData(data) {
  //节点映射表
  const map = {};
  data.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });
  //存储菜单数据
  const menuData = [];
  //处理节点关系
  data.forEach(item => {
    if (item.parentID === null) {
      menuData.push(map[item.id]);
    } else {
      const parent = map[item.parentID];
      if (parent) {
        parent.children.push(map[item.id]);
      }
    }
  });
  //转换格式
  const elementPlusMenuData = menuData.map(item => ({
    index: item.route,
    title: item.zhName,
    icon: item.icon,
    children: item.children.map(child => ({
      index: child.route,
      title: child.zhName,
      icon: child.icon
    }))
  }));
  return elementPlusMenuData;
}

onBeforeMount(() => {
  getMenu()
})

</script>

<style scoped lang="scss">
.menu{
  border-right: 1px solid rgb(220 223 230);
}
</style>