<template>
  <el-dialog :title="props.title" v-model="visible" width="450" @close="closeDialog()">
    <el-form ref="roleForm" :model="RoleData" label-width="120px">
      <el-form-item label="角色ID">
        <span v-if="props.title=='编辑角色'">{{RoleData.RoleID}}</span>
        <el-input v-else v-model="RoleData.RoleID" placeholder="请输入角色ID"/>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="RoleData.RoleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          ref="treeRef"
          :data= "treeData"
          node-key="value"
          :default-checked-keys="checkedKeys"
          show-checkbox
          @check-change="CheckChange"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveRole()">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { RoleCreate,RoleUpdate } from '@/apis/role';
import { getLocaleMenuTree } from '@/stores/GlobalState';
const props = defineProps(['visible','title','data']);
const treeRef = ref()
const treeData = ref([]);
const checkedKeys = ref([]);
const RoleData = reactive({
  RoleID:'',
  RoleName:'',
});
const visible = ref(false);
watch(() => props.visible, (newValue) => {
  visible.value = newValue;
});

watch(() => props.data, (newValue) => {
  if(newValue){
    RoleData.RoleID = newValue.RoleID;
    RoleData.RoleName = newValue.RoleName;
    RoleData.checkedKeys = newValue.checkedKeys;
  }
});
const emit = defineEmits(["onClose", "saveRole"]);

const closeDialog = () => {
  emit("onClose");
};
const clearData = () => {
  RoleData.RoleID = '';
  RoleData.RoleName = '';
  RoleData.checkedKeys = [];
}
const CheckChange = () => {
  checkedKeys.value = treeRef.value.getCheckedKeys(false)
}

onBeforeMount(async() => {
  treeData.value  = await getLocaleMenuTree();
});
const saveRole = () => {
  if(props.title == '新增角色'){
    RoleCreate({
      ...RoleData,
      checkedKeys:checkedKeys.value
    }).then((res) => {
      if (res.code == 200) {
        ElMessage.success(res.message)
        clearData()
        visible.value = false
      } else {
        ElMessage.error(res.message)
      }
    });
  }else{
    RoleUpdate({
      ...RoleData,
      checkedKeys:checkedKeys.value
    }).then((res) => {
      if (res.code == 200) {
        ElMessage.success(res.message)
        clearData()
        visible.value = false
      } else {
        ElMessage.error(res.message)
      }
    });
  }
};
</script>