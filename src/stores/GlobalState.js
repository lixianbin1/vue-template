//持久存储
export const useLocaleUser = createGlobalState(()=>{
  return useStorage('user',{
    name:"Lxb"
  })
})

//用户信息
export const useUserInfo = createGlobalState(()=>useStorage('userInfo',{},sessionStorage))

export const useGlobalMenu = createGlobalState(()=>useStorage('userMenu',{},sessionStorage))
