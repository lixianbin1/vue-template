<template>
  <div class="menu-manager">
    <el-form :inline="true" :model="query">
      <el-form-item label="菜单名称">
        <el-input v-model="query.MenuName" placeholder="请输入菜单名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button type="primary" @click="openAdd">添加菜单</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="menuData" row-key="id" default-expand-all border style="    height: calc(100vh - 200px);">
      <el-table-column prop="MenuName" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="ZhName" label="中文名称" width="180"></el-table-column>
      <el-table-column prop="Route" label="路由路径" width="180"></el-table-column>
      <el-table-column prop="Icon" label="图标" width="180"></el-table-column>
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button size="small" @click="openEditMenuDialog(scope.row)">编辑</el-button>
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
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="50%">
      <el-form ref="menuForm" :model="menuForm" label-width="120px">
        <el-form-item label="菜单名称">
          <el-input v-model="menuForm.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="中文名称">
          <el-input v-model="menuForm.zhName" placeholder="请输入中文名称"></el-input>
        </el-form-item>
        <el-form-item label="路由路径">
          <el-input v-model="menuForm.route" placeholder="请输入路由路径"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menuForm.icon" placeholder="请输入图标类名"></el-input>
        </el-form-item>
        <el-form-item label="父菜单">
          <el-select v-model="menuForm.parentID" placeholder="请选择父菜单">
            <el-option
              v-for="item in menuData"
              :key="item.id"
              :label="item.zhName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMenu">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { MenuList } from '@/apis/menu';
  const menuData = ref([]);
  const query = ref({

  });
  const pagination = ref({
    total:0,
    current:1,
    pageSize:20,
  }); 
onBeforeMount(async() => {
  getMenuList()
});

const getMenuList = async() => { 
  MenuList({
    current:pagination.value.current,
    pageSize:pagination.value.pageSize,
  }).then(res => {
    menuData.value = res.data;
    pagination.value.total = res.total;
    pagination.value.current = res.current;
    pagination.value.pageSize = res.pageSize;
  });
};
const onQuery = () => {
  getMenuList()
};
const SizeChange = (val) => {
  pagination.value.pageSize = val;
  getMenuList()
};
const CurrentChange = (val) => {
  pagination.value.current = val;
  getMenuList()
}

  const dialogVisible = ref(false);
  const dialogTitle = ref('');
  const menuForm = ref({
    id: '',
    name: '',
    zhName: '',
    route: '',
    icon: '',
    parentID: null,
  });
  
  const openAdd = () => {
    dialogTitle.value = '添加菜单';
    menuForm.value = {
      id: '',
      name: '',
      zhName: '',
      route: '',
      icon: '',
      parentID: null,
    };
    dialogVisible.value = true;
  };
  
  const openEditMenuDialog = (data) => {
    dialogTitle.value = '编辑菜单';
    menuForm.value = { ...data };
    dialogVisible.value = true;
  };
  
  const deleteMenu = (data) => {
    ElMessageBox.confirm('确定要删除该菜单吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        const index = menuData.value.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          menuData.value.splice(index, 1);
          ElMessage.success('删除成功');
        }
      })
      .catch(() => {
        ElMessage.info('已取消删除');
      });
  };
  
  const saveMenu = () => {
    if (menuForm.value.id) {
      // 编辑菜单
      const index = menuData.value.findIndex((item) => item.id === menuForm.value.id);
      if (index !== -1) {
        menuData.value[index] = { ...menuForm.value };
        ElMessage.success('编辑成功');
      }
    } else {
      // 添加菜单
      menuData.value.push({ ...menuForm.value });
      ElMessage.success('添加成功');
    }
    dialogVisible.value = false;
  };
  </script>
  
  <style scoped>

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>