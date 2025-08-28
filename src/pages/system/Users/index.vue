<template>
  <div class="menu-manager">
    <el-form :inline="true" :model="query">
      <el-form-item label="菜单名称">
        <el-input v-model="query.MenuName" placeholder="请输入菜单名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button type="primary" @click="openAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" row-key="id" default-expand-all border style="height: calc(100vh - 200px);">
      <el-table-column prop="UserID" label="用户ID"></el-table-column>
      <el-table-column prop="UserName" label="用户名称"></el-table-column>
      <el-table-column prop="Roles" label="用户角色"/>
      <el-table-column prop="Email" label="用户邮箱" width="180"></el-table-column>
      <el-table-column prop="Status" label="状态" width="70">
        <template #default="scope">
          <el-switch v-if="!scope.row.Roles?.includes('管理员')" v-model="scope.row.Status" active-value="1"></el-switch>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button v-if="!scope.row.Roles?.includes('管理员')" size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-button v-if="!scope.row.Roles?.includes('管理员')" size="small" type="danger" @click="deleteMenu(scope.row)">删除</el-button>
          <span v-else></span>
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
    <UserDialog :visible="dialogVisible" :title="dialogTitle" @onClose="closeDialog" :data="dialogData"/>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import UserDialog from './UserDialog.vue';
import { UserList,UserDelete } from '@/apis/user';

const tableData = ref([]);

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
  getUserList()
});

const getUserList = async() => { 
  UserList({
    current:pagination.value.current,
    pageSize:pagination.value.pageSize,
  }).then(res => { 
    tableData.value = res.data;
    pagination.value.total = res.total;
    pagination.value.current = res.current;
    pagination.value.pageSize = res.pageSize;
  });
};

const onQuery = () => {
  getUserList()
};
const SizeChange = (val) => {
  pagination.value.pageSize = val;
  getUserList()
};
const CurrentChange = (val) => {
  pagination.value.current = val;
  getUserList()
}
const openAdd = () => {
  dialogTitle.value = '新增用户';
  dialogVisible.value = true;
};
const openEdit=(row)=>{ 
  dialogVisible.value = true;
  dialogTitle.value = '编辑用户';
  dialogData.value = row;
}
const closeDialog = () => {
  dialogVisible.value = false;
  dialogData.value={}
  getUserList()
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
    getUserList()
  })
}
</script>
  
<style scoped>
</style>