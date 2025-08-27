<template>
  <div class="menu-manager">
    <el-form :inline="true" :model="query">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4">
          <el-form-item label="菜单名称">
            <el-input v-model="query.MenuName" placeholder="请输入菜单名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4">
          <el-form-item label="菜单ID">
            <el-input v-model="query.MenuID" placeholder="请输入菜单ID" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4">
          <el-form-item label="中文名称">
            <el-input v-model="query.ZhName" placeholder="请输入中文名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4">
          <el-form-item label="父级菜单ID">
            <el-input v-model="query.ParentID" placeholder="请输入父级菜单ID" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4">
          <el-form-item label="路由">
            <el-input v-model="query.Route" placeholder="请输入路由" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4">
          <el-form-item label="图标">
            <el-input v-model="query.Icon" placeholder="请输入图标" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4">
          <el-form-item label="排序索引">
            <el-input v-model="query.OrderIndex" placeholder="请输入排序索引" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4">
          <el-form-item>
            <el-button type="primary" @click="onQuery">查询</el-button>
            <el-button type="primary" @click="openAdd">添加菜单</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="menuData" row-key="id" default-expand-all border style="    height: calc(100vh - 230px);">
      <el-table-column prop="MenuID" label="菜单ID"></el-table-column>
      <el-table-column prop="MenuName" label="菜单名称" min-width="140"></el-table-column>
      <el-table-column prop="ZhName" label="中文名称" min-width="120"></el-table-column>
      <el-table-column prop="Route" label="路由路径" min-width="140"></el-table-column>
      <el-table-column prop="Icon" label="图标" min-width="100"></el-table-column>
      <el-table-column prop="ParentID" label="父级ID"></el-table-column>
      <el-table-column prop="OrderIndex" label="索引"></el-table-column>
      <el-table-column label="操作" width="150">
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
    <MenuDialog :visible="dialogVisible" :title="dialogTitle" @onClose="closeDialog" :data="dialogData"/>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import MenuDialog from './MenuDialog.vue';
import { MenuList,MenuDelete } from '@/apis/menu';
const menuData = ref([]);

const query = ref({});
const pagination = ref({
  total:0,
  current:1,
  pageSize:20,
});

onBeforeMount(async() => {
  getMenuList()
});

const getMenuList = async() => {
  return new Promise((resolve,reject) => {
    MenuList({
      ...query.value,
      ...pagination.value,
    }).then(res => {
      menuData.value = res.data;
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
  getMenuList().then((res) => {
    ElMessage.success(res.message);
  });
};
const SizeChange = (val) => {
  pagination.value.pageSize = val;
  getMenuList()
};
const CurrentChange = (val) => {
  pagination.value.current = val;
  getMenuList()
}

//弹窗
const dialogVisible  = ref(false);
const dialogTitle = ref('添加菜单');
const dialogData = ref(null);
const openAdd = () => {
  dialogTitle.value = '添加菜单';
  dialogVisible.value = true;
};
  
const openEdit = (row) => {
  dialogTitle.value = '编辑菜单';
  dialogData.value = {...row};
  dialogVisible.value = true;
};
const closeDialog = () => {
  console.log('closeDialog');
  dialogVisible.value = false;
  dialogData.value={}
  getMenuList()
};
  
const deleteMenu = (data) => {
  ElMessageBox.confirm('确定要删除该菜单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  .then(() => {
    MenuDelete({MenuID:data.MenuID}).then(res => {
      ElMessage.success(res.message);
    }).catch(err => {
      ElMessage.error(err.message);
    })
    getMenuList()
  })
  .catch(() => {
    ElMessage.info('已取消删除');
  });
};  
</script>
  
<style scoped>

</style>