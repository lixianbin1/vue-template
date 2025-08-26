<template>
  <div class="menu-manager">
    <el-form :inline="true" :model="query">
      <el-form-item label="角色名称">
        <el-input v-model="query.MenuName" placeholder="请输入角色名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button type="primary" @click="openAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="roleData" row-key="id" default-expand-all border style="height: calc(100vh - 200px);">
      <el-table-column prop="RoleID" label="角色ID"></el-table-column>
      <el-table-column prop="RoleName" label="角色名称"></el-table-column>
      <el-table-column prop="Status" label="状态" width="70">
        <template #default="scope">
          <el-switch v-if="scope.row.RoleID !=='admin'" v-model="scope.row.Status" active-value="1"></el-switch>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteMenu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="SizeChange"
      @current-change="CurrentChange"
    />
    <RoleDialog :visible="dialogVisible" :title="dialogTitle" @onClose="closeAdd" :data="dialogData"/>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import RoleDialog from './RoleDialog.vue';
import { RoleList } from '@/apis/role';

const roleData = ref([]);

const query = ref({

});
const pagination = ref({
  total:0,
  current:1,
  pageSize:20,
}); 
const dialogVisible  = ref(false);
const dialogTitle = ref('新增');
const dialogData = ref(null);
const menuForm = reactive({
  id: '',
  name: '',
  zhName: '',
  route: '',
  icon: '',
  parentID: null,
});
onBeforeMount(async() => {
  getRoleList()
});

const getRoleList = async() => { 
  RoleList({
    current:pagination.value.current,
    pageSize:pagination.value.pageSize,
  }).then(res => { 
    roleData.value = res.data;
    pagination.value.total = res.total;
    pagination.value.current = res.current;
    pagination.value.pageSize = res.pageSize;
  });
};

const onQuery = () => {
  getRoleList()
};
const SizeChange = (val) => {
  pagination.value.pageSize = val;
  getRoleList()
};
const CurrentChange = (val) => {
  pagination.value.current = val;
  getRoleList()
}
const openAdd = () => {
  dialogVisible.value = true;
};
const openEdit=(row)=>{ 
  dialogVisible.value = true;
  dialogTitle.value = '编辑';
  dialogData.value = row;
}
const closeAdd = () => {
  dialogVisible.value = false;
};

const deleteMenu = (row) => {
  UserDelete({
    UserID: row.UserID
  }).then((res) => {
    if (res.code == 200) {
      ElMessage.success(res.message)
    } else {
      ElMessage.error(res.message)
    }
  }).finally(() => {
    getRoleList()
  })
}
</script>
  
<style scoped>
</style>