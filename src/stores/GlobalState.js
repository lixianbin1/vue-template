import { RoleList } from '@/apis/role';
import { MenuTree } from '@/apis/menu';

//角色下拉
export const useLocaleRoles = createGlobalState(()=>{
  return useStorage('roles',[],sessionStorage)
})
export const getLocaleRoles = async()=>{
  const useRoles = useLocaleRoles()
  if(!useRoles.value.length){
    const res = await RoleList()
    useRoles.value = res.data
  }
  return useRoles.value
}

export const useLocaleMenuTree = createGlobalState(()=>{
  return useStorage('menuTree',[],sessionStorage)
})
export const getLocaleMenuTree = async()=>{
  const useMenuTree = useLocaleMenuTree()
  if(!useMenuTree.value.length){
    const res = await MenuTree()
    useMenuTree.value = res.data
  }
  return useMenuTree.value
}


//用户信息
export const useUserInfo = createGlobalState(()=>useStorage('userInfo',{},sessionStorage))

export const useGlobalMenu = createGlobalState(()=>useStorage('userMenu',{},sessionStorage))
