<template>
  <el-dialog :title="props.title" v-model="visible" width="50%" @before-close="closeDialog">
    <el-form ref="menuForm" :model="UserData" label-width="120px">
      <el-form-item label="邮件">
        <el-input v-model="UserData.Email" placeholder="请输入邮件"></el-input>
      </el-form-item>
      <el-form-item label="密码" v-if="props.title=='添加'">
        <el-input v-model="UserData.Password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="UserData.UserName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="UserData.RoleID" placeholder="请选择角色">
          <el-option v-for="item in rolesData" :key="item.RoleID" :label="item.RoleName" :value="item.RoleID"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog()">取消</el-button>
      <el-button type="primary" @click="saveMenu">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { UserAdd } from '@/apis/user';
import { getLocaleRoles } from '@/stores/GlobalState';
const props = defineProps(['visible','title','data']);

const rolesData = ref([]);
const UserData = reactive({
  Email:'',
  Password:'',
  UserName: '',
  RoleID:'',
});
const visible = ref(false);
watch(() => props.visible, (newValue) => {
  visible.value = newValue;
});

watch(() => props.data, (newValue) => {
  if(newValue){
    UserData.Email = newValue.Email;
    UserData.Password = newValue.Password;
    UserData.UserName = newValue.UserName;
    UserData.RoleID = newValue.RoleID;
  }
});
const emit = defineEmits(["onClose", "saveMenu"]);

const closeDialog = () => {
  emit("onClose");
};

onBeforeMount(async() => {
  rolesData.value  = await getLocaleRoles();
  console.log(rolesData);
});
const saveMenu = () => {
  UserAdd(UserData).then(() => {
    if (res.code == 200) {
      ElMessage.success(res.message)
    } else {
      ElMessage.error(res.message)
    }
    closeDialog();
  });
};
</script>