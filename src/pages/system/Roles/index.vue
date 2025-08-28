<template>
  <div class="role-manager">
    <el-form :inline="true" :model="query">
      <el-form-item label="角色名称">
        <el-input v-model="query.MenuName" placeholder="请输入角色名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button type="primary" @click="openAdd">添加</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="roleData" row-key="id" default-expand-all border style="height: calc(100vh - 230px);">
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
    <RoleDialog :visible="dialogVisible" :title="dialogTitle" @onClose="closeDialog" :data="dialogData"/>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import RoleDialog from './RoleDialog.vue';
import { RoleList,RoleDelete } from '@/apis/role';

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

onBeforeMount(async() => {
  getRoleList()
});

const getRoleList = async() => { 
  return new Promise((resolve,reject) => {
    RoleList({
      ...query.value,
      ...pagination.value,
    }).then(res => {
      roleData.value = res.data;
      pagination.value.total = res.total;
      pagination.value.current = res.current;
      pagination.value.pageSize = res.pageSize;
      resolve(res);
    }).catch(err => {
      reject(err);
      ElMessage.error(err.message);
    })
  });
};

const onQuery = () => {
  getRoleList().then((res) => {
    ElMessage.success(res.message);
  });
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
  dialogTitle.value = '新增角色';
  dialogVisible.value = true;
};
const openEdit = (row) => {
  dialogTitle.value = '编辑角色';
  dialogData.value = {...row};
  dialogVisible.value = true;
};
const closeDialog = () => {
  console.log('closeDialog');
  dialogVisible.value = false;
  dialogData.value={}
  getRoleList()
};

const deleteMenu = (row) => {
  RoleDelete({
    RoleID: row.RoleID
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