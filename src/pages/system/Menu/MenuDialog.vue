<template>
  <el-dialog :title="props.title" v-model="visible" width="450" @close="closeDialog()">
    <el-form ref="menuForm" :model="MenuData" label-width="120px">
      <el-form-item label="菜单名称">
        <el-input v-model="MenuData.MenuName" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="中文名称">
        <el-input v-model="MenuData.ZhName" placeholder="请输入中文名称"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单ID">
        <el-tree-select
          clearable
          v-model="MenuData.ParentID"
          check-strictly=true
          :data="treeData"
        />
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="MenuData.Route" placeholder="请输入路由"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="MenuData.Icon" placeholder="请输入图标"></el-input>
      </el-form-item>
      <el-form-item label="排序索引">
        <el-input-number v-model="MenuData.OrderIndex" :min="1"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveMenu()">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { MenuADD,MenuUpdate } from '@/apis/menu';
import { getLocaleMenuTree,upLocaleMenuTree } from '@/stores/GlobalState';
const props = defineProps(['visible','title','data']);

const treeData = ref([]);
const MenuData = reactive({
  MenuName: '',
  ZhName: '',
  ParentID: '',
  Route: '',
  Icon: '',
  OrderIndex: '',
});
const visible = ref(false);
watch(() => props.visible, (newValue) => {
  visible.value = newValue;
});

watch(() => props.data, (newValue) => {
  if(newValue){
    MenuData.MenuID = newValue.MenuID;
    MenuData.MenuName = newValue.MenuName;
    MenuData.ZhName = newValue.ZhName;
    MenuData.ParentID = newValue.ParentID;
    MenuData.Route = newValue.Route;
    MenuData.Icon = newValue.Icon;
    MenuData.OrderIndex = newValue.OrderIndex;
  }
});
const emit = defineEmits(["onClose", "saveMenu"]);

const closeDialog = () => {
  emit("onClose");
};
const clearMenu = () => {
  MenuData.MenuID = undefined;
  MenuData.MenuName = '';
  MenuData.ZhName = '';
  MenuData.ParentID = '';
  MenuData.Route = '';
  MenuData.Icon = '';
  MenuData.OrderIndex = 1;
};
onBeforeMount(async() => {
  treeData.value  = await getLocaleMenuTree();
});
const saveMenu = () => {
  if(props.title == '新增菜单'){
    MenuADD(MenuData).then((res) => {
      if (res.code == 200) {
        ElMessage.success(res.message)
        clearMenu()
        visible.value = false
      } else {
        ElMessage.error(res.message)
      }
      upLocaleMenuTree()
    });
  }else{
    MenuUpdate(MenuData).then((res) => {
      if (res.code == 200) {
        ElMessage.success(res.message)
        clearMenu()
        visible.value = false
      } else {
        ElMessage.error(res.message)
      }
      upLocaleMenuTree()
    });
  }
};
</script>