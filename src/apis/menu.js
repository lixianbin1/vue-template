import require from './require'

const auto = import.meta.env.VITE_APP_Auto
const network = import.meta.env.VITE_APP_NetWork

export const DynamicMenu = function (params) {
  return require({
    url: `${network}/${auto}/dynamic/menu`,
    method: 'get',
    params,
  })
}
export const MenuList = function (params) {
  return require({
    url: `${network}/${auto}/menu/list`,
    method: 'GET',
    params,
  })
}