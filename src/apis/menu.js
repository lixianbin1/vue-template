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

export const MenuTree = function (params) {
  return require({
    url: `${network}/${auto}/menu/tree`,
    method: 'GET',
    params,
  })
}

export const MenuADD = function (data) {
  return require({
    url: `${network}/${auto}/menu/create`,
    method: 'POST',
    data,
  })
}

export const MenuDelete = function (data) {
  return require({
    url: `${network}/${auto}/menu/delete`,
    method: 'POST',
    data,
  })
}

export const MenuUpdate = function (data) {
  return require({
    url: `${network}/${auto}/menu/update`,
    method: 'POST',
    data,
  })
}