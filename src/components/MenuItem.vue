<script setup>

const props = defineProps(['data'])
const { t } = useI18n()
const ItemData = ref(props.data)
console.log(1111,ItemData)
</script>

<template>
  <el-sub-menu v-if="ItemData.children?.length" :index="ItemData.index">
    <template #title>
      <el-icon v-if="ItemData.icon">
        <component :is="ItemData.icon"/>
      </el-icon>
      <span>{{ ItemData.title }}</span>
    </template>
    <template v-for="item in ItemData.children" :key="item.index">
      <MenuItem :data="item" />
    </template>
    <el-menu-item :index="ItemData.index" style="display: none;" />
  </el-sub-menu>
  <el-menu-item v-else :index="ItemData.index">
    <el-icon v-if="ItemData.icon">
      <component :is="ItemData.icon"/>
    </el-icon>
    <span>{{ ItemData.title }}</span>
  </el-menu-item>
</template>